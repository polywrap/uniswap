import { tradeMaximumAmountIn, tradeMinimumAmountOut } from "./trade";
import {
  ChainId,
  Ethereum_Module,
  getChainIdKey,
  Args_estimateGas,
  Args_swapCallParameters,
  Args_execCallStatic,
  SwapParameters,
  TradeType,
  TxOverrides,
  Ethereum_StaticTxResult,
} from "../wrap";
import { currencyEquals } from "./token";
import { UNISWAP_ROUTER_CONTRACT, getSwapMethodAbi, ETHER } from "../utils";

import { BigInt, Box } from "@polywrap/wasm-as";

const ZERO_HEX = "0x0";

export function toHex(currencyAmount: BigInt): string {
  return "0x" + currencyAmount.toString(16);
}

export function swapCallParameters(
  args: Args_swapCallParameters
): SwapParameters {
  const etherIn = currencyEquals({
    currency: args.trade.inputAmount.token.currency,
    other: ETHER,
  });
  const etherOut = currencyEquals({
    currency: args.trade.outputAmount.token.currency,
    other: ETHER,
  });

  if (etherIn && etherOut) {
    throw new Error("Ether can't be trade input and output");
  }

  if (args.tradeOptions.ttl === null && args.tradeOptions.deadline === null) {
    throw new Error("Either ttl or deadline have to be defined for trade");
  }

  const to = args.tradeOptions.recipient;
  const amountIn = toHex(
    tradeMaximumAmountIn({
      trade: args.trade,
      slippageTolerance: args.tradeOptions.allowedSlippage,
    }).amount
  );
  const amountOut = toHex(
    tradeMinimumAmountOut({
      trade: args.trade,
      slippageTolerance: args.tradeOptions.allowedSlippage,
    }).amount
  );

  const pathArray = args.trade.route.path.map<string>((token) => token.address);
  const path = '["' + pathArray.join('","') + '"]';
  const deadline = args.tradeOptions.ttl
    ? "0x" +
      (
        args.tradeOptions.unixTimestamp + (args.tradeOptions.ttl as Box<u32>).unwrap()
      ).toString(16)
    : "0x" + (args.tradeOptions.deadline as Box<u32>).unwrap().toString(16);
  const useFeeOnTransfer = args.tradeOptions.feeOnTransfer;

  let methodName: string;
  let input: string[];
  let value: string;

  switch (args.trade.tradeType) {
    case TradeType.EXACT_INPUT:
      if (etherIn) {
        methodName =
          useFeeOnTransfer && useFeeOnTransfer.unwrap()
            ? "swapExactETHForTokensSupportingFeeOnTransferTokens"
            : "swapExactETHForTokens";
        // (uint amountOutMin, address[] calldata path, address to, uint deadline)
        input = [amountOut, path, to, deadline];
        value = amountIn;
      } else if (etherOut) {
        methodName =
          useFeeOnTransfer && useFeeOnTransfer.unwrap()
            ? "swapExactTokensForETHSupportingFeeOnTransferTokens"
            : "swapExactTokensForETH";
        // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        input = [amountIn, amountOut, path, to, deadline];
        value = ZERO_HEX;
      } else {
        methodName =
          useFeeOnTransfer && useFeeOnTransfer.unwrap()
            ? "swapExactTokensForTokensSupportingFeeOnTransferTokens"
            : "swapExactTokensForTokens";
        // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        input = [amountIn, amountOut, path, to, deadline];
        value = ZERO_HEX;
      }
      break;
    case TradeType.EXACT_OUTPUT:
      if (useFeeOnTransfer && useFeeOnTransfer.unwrap()) {
        throw new Error("Cannot use fee on transfer with exact out trade");
      }

      if (etherIn) {
        methodName = "swapETHForExactTokens";
        // (uint amountOut, address[] calldata path, address to, uint deadline)
        input = [amountOut, path, to, deadline];
        value = amountIn;
      } else if (etherOut) {
        methodName = "swapTokensForExactETH";
        // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        input = [amountOut, amountIn, path, to, deadline];
        value = ZERO_HEX;
      } else {
        methodName = "swapTokensForExactTokens";
        // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        input = [amountOut, amountIn, path, to, deadline];
        value = ZERO_HEX;
      }
      break;
    default:
      throw new Error("method name not found");
  }

  return {
    methodName: methodName,
    args: input,
    value: value,
  };
}

export function estimateGas(args: Args_estimateGas): BigInt {
  const swapParameters: SwapParameters = args.parameters;
  const chainId = args.chainId;
  return Ethereum_Module.estimateContractCallGas({
    address: UNISWAP_ROUTER_CONTRACT,
    method: getSwapMethodAbi(swapParameters.methodName),
    args: sanitizeSwapArgs(swapParameters.methodName, swapParameters.args),
    connection: chainId === null
      ? null
      : {
          node: null,
          networkNameOrChainId: getChainIdKey(chainId.unwrap()),
        },
    options: {
      value: BigInt.fromString(swapParameters.value.substring(2), 16),
      gasLimit: null,
      gasPrice: null,
      maxFeePerGas: null,
      maxPriorityFeePerGas: null,
      nonce: null
    },
  }).unwrap();
}

export function execCallStatic(
  args: Args_execCallStatic
): Ethereum_StaticTxResult {
  const swapParameters: SwapParameters = args.parameters;
  const chainId: ChainId = args.chainId;
  const txOverrides: TxOverrides =
    args.txOverrides === null
      ? { gasLimit: null, gasPrice: null }
      : args.txOverrides!;

  return Ethereum_Module.callContractStatic({
    address: UNISWAP_ROUTER_CONTRACT,
    method: getSwapMethodAbi(swapParameters.methodName),
    args: sanitizeSwapArgs(swapParameters.methodName, swapParameters.args),
    connection: {
      node: null,
      networkNameOrChainId: getChainIdKey(chainId),
    },
    options: {
      value: BigInt.fromString(swapParameters.value.substring(2), 16),
      gasPrice: txOverrides.gasPrice,
      gasLimit: txOverrides.gasLimit,
      maxFeePerGas: null,
      maxPriorityFeePerGas: null,
      nonce: null
    },
  }).unwrap();
}

export function sanitizeSwapArgs(method: string, args: string[]): string[] {
  // get indexes of values to unhex
  let toUnHex: i32[] = [];
  if (method == "swapExactTokensForTokens") toUnHex = [0, 1, 4];
  else if (method == "swapTokensForExactTokens") toUnHex = [0, 1, 4];
  else if (method == "swapExactETHForTokens") toUnHex = [0, 3];
  else if (method == "swapTokensForExactETH") toUnHex = [0, 1, 4];
  else if (method == "swapExactTokensForETH") toUnHex = [0, 1, 4];
  else if (method == "swapETHForExactTokens") toUnHex = [0, 3];
  else if (method == "swapExactTokensForTokensSupportingFeeOnTransferTokens") toUnHex = [0, 1, 4];
  else if (method == "swapExactETHForTokensSupportingFeeOnTransferTokens") toUnHex = [0, 3];
  else if (method == "swapExactTokensForETHSupportingFeeOnTransferTokens") toUnHex = [0, 1, 4];
  else return args;

  // unhex values and remove quotes
  let result: string[] = [];
  for (let i = 0; i < args.length; i++) {
    let arg = args[i].replaceAll('"', "").replaceAll("\\", "");
    if (toUnHex.includes(i) && arg.startsWith("0x")) {
      result.push(BigInt.fromString(arg.substring(2), 16).toString());
    } else {
      result.push(arg);
    }
  }
  return result;
}
