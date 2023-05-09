/* eslint-disable @typescript-eslint/naming-convention */
import {
  ChainId,
  Ethers_Module,
  Ethers_TxResponse,
  GasOptions,
  getChainIdKey,
  Args_approve,
  Args_execCall,
  MethodParameters,
} from "../wrap";
import { MAX_UINT_256, ROUTER_ADDRESS } from "../utils";

import { BigInt } from "@polywrap/wasm-as";

export function execCall(args: Args_execCall): Ethers_TxResponse {
  const methodParameters: MethodParameters = args.parameters;
  const chainId: ChainId = args.chainId;
  const address: string = args.address;
  const gasOptions: GasOptions | null = args.gasOptions;

  return Ethers_Module.sendTransaction({
    tx: {
      to: address,
      _from: null,
      nonce: null,
      gasLimit: gasOptions === null ? null : gasOptions.gasLimit,
      gasPrice: gasOptions === null ? null : gasOptions.gasPrice,
      data: methodParameters.calldata,
      value: BigInt.fromString(methodParameters.value, 16),
      chainId: null,
      _type: null,
      maxFeePerGas: gasOptions === null ? null : gasOptions.maxFeePerGas,
      maxPriorityFeePerGas: gasOptions === null ? null : gasOptions.maxPriorityFeePerGas,
      accessList: null,
    },
    connection: {
      node: null,
      networkNameOrChainId: getChainIdKey(chainId),
    },
  }).unwrap();
}

export function approve(args: Args_approve): Ethers_TxResponse {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const amount: BigInt = args.amount === null ? MAX_UINT_256 : args.amount!;
  const gasOptions: GasOptions | null = args.gasOptions;

  return Ethers_Module.callContractMethod({
    address: args.token.address,
    method:
      "function approve(address spender, uint value) external returns (bool)",
    args: [ROUTER_ADDRESS, amount.toString()],
    connection: {
      node: null,
      networkNameOrChainId: getChainIdKey(args.token.chainId),
    },
    options: {
      value: null,
      gasLimit: gasOptions === null ? null : gasOptions.gasLimit,
      gasPrice: gasOptions === null ? null : gasOptions.gasPrice,
      maxFeePerGas: gasOptions === null ? null : gasOptions.maxFeePerGas,
      maxPriorityFeePerGas: gasOptions === null ? null : gasOptions.maxPriorityFeePerGas,
      nonce: null,
    },
  }).unwrap();
}
