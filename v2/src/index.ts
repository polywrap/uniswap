import {
  Args_approve,
  Args_bestTradeExactIn,
  Args_bestTradeExactOut, Args_createRoute, Args_createTrade,
  Args_currencyEquals, Args_estimateGas, Args_exec,
  Args_execCall,
  Args_execCallStatic,
  Args_fetchKLast, Args_fetchPairData,
  Args_fetchTokenData,
  Args_fetchTotalSupply, Args_pairAddress,
  Args_pairInputAmount,
  Args_pairInputNextPair, Args_pairLiquidityMinted,
  Args_pairLiquidityToken,
  Args_pairLiquidityValue,
  Args_pairOutputAmount,
  Args_pairOutputNextPair, Args_pairReserves, Args_pairToken0Price,
  Args_pairToken1Price,
  Args_routeMidPrice,
  Args_routePath,
  Args_swap, Args_swapCallParameters, Args_tokenAmountEquals,
  Args_tokenEquals, Args_tokenSortsBefore, Args_tradeExecutionPrice,
  Args_tradeMaximumAmountIn,
  Args_tradeMinimumAmountOut,
  Args_tradeNextMidPrice,
  Args_tradeSlippage, Ethereum_StaticTxResult, Ethereum_TxResponse,
  ModuleBase, Pair, Route, SwapParameters, Token, TokenAmount, Trade
} from "./wrap";

import * as Entities from "./entities";
import {BigInt} from "@polywrap/wasm-as";

export class Module extends ModuleBase {
  approve(args: Args_approve): Ethereum_TxResponse {
    return Entities.approve(args);
  }

  bestTradeExactIn(args: Args_bestTradeExactIn): Array<Trade> {
    return Entities.bestTradeExactIn(args);
  }

  bestTradeExactOut(args: Args_bestTradeExactOut): Array<Trade> {
    return Entities.bestTradeExactOut(args);
  }

  createRoute(args: Args_createRoute): Route {
    return Entities.createRoute(args);
  }

  createTrade(args: Args_createTrade): Trade {
    return Entities.createTrade(args);
  }

  currencyEquals(args: Args_currencyEquals): bool {
    return Entities.currencyEquals(args);
  }

  estimateGas(args: Args_estimateGas): BigInt {
    return Entities.estimateGas(args);
  }

  exec(args: Args_exec): Ethereum_TxResponse {
    return Entities.exec(args);
  }

  execCall(args: Args_execCall): Ethereum_TxResponse {
    return Entities.execCall(args);
  }

  execCallStatic(args: Args_execCallStatic): Ethereum_StaticTxResult {
    return Entities.execCallStatic(args);
  }

  fetchKLast(args: Args_fetchKLast): BigInt {
    return Entities.fetchKLast(args);
  }

  fetchPairData(args: Args_fetchPairData): Pair {
    return Entities.fetchPairData(args);
  }

  fetchTokenData(args: Args_fetchTokenData): Token {
    return Entities.fetchTokenData(args);
  }

  fetchTotalSupply(args: Args_fetchTotalSupply): TokenAmount {
    return Entities.fetchTotalSupply(args);
  }

  pairAddress(args: Args_pairAddress): string {
    return Entities.pairAddress(args);
  }

  pairInputAmount(args: Args_pairInputAmount): TokenAmount {
    return Entities.pairInputAmount(args);
  }

  pairInputNextPair(args: Args_pairInputNextPair): Pair {
    return Entities.pairInputNextPair(args);
  }

  pairLiquidityMinted(args: Args_pairLiquidityMinted): TokenAmount | null {
    return Entities.pairLiquidityMinted(args);
  }

  pairLiquidityToken(args: Args_pairLiquidityToken): Token {
    return Entities.pairLiquidityToken(args);
  }

  pairLiquidityValue(args: Args_pairLiquidityValue): Array<TokenAmount> {
    return Entities.pairLiquidityValue(args);
  }

  pairOutputAmount(args: Args_pairOutputAmount): TokenAmount {
    return Entities.pairOutputAmount(args);
  }

  pairOutputNextPair(args: Args_pairOutputNextPair): Pair {
    return Entities.pairOutputNextPair(args);
  }

  pairReserves(args: Args_pairReserves): Array<TokenAmount> {
    return Entities.pairReserves(args);
  }

  pairToken0Price(args: Args_pairToken0Price): string {
    return Entities.pairToken0Price(args);
  }

  pairToken1Price(args: Args_pairToken1Price): string {
    return Entities.pairToken1Price(args);
  }

  routeMidPrice(args: Args_routeMidPrice): string {
    return Entities.routeMidPrice(args);
  }

  routePath(args: Args_routePath): Array<Token> {
    return Entities.routePath(args);
  }

  swap(args: Args_swap): Ethereum_TxResponse {
    return Entities.swap(args);
  }

  swapCallParameters(args: Args_swapCallParameters): SwapParameters {
    return Entities.swapCallParameters(args);
  }

  tokenAmountEquals(args: Args_tokenAmountEquals): bool {
    return Entities.tokenAmountEquals(args);
  }

  tokenEquals(args: Args_tokenEquals): bool {
    return Entities.tokenEquals(args);
  }

  tokenSortsBefore(args: Args_tokenSortsBefore): bool {
    return Entities.tokenSortsBefore(args);
  }

  tradeExecutionPrice(args: Args_tradeExecutionPrice): string {
    return Entities.tradeExecutionPrice(args);
  }

  tradeMaximumAmountIn(args: Args_tradeMaximumAmountIn): TokenAmount {
    return Entities.tradeMaximumAmountIn(args);
  }

  tradeMinimumAmountOut(args: Args_tradeMinimumAmountOut): TokenAmount {
    return Entities.tradeMinimumAmountOut(args);
  }

  tradeNextMidPrice(args: Args_tradeNextMidPrice): string {
    return Entities.tradeNextMidPrice(args);
  }

  tradeSlippage(args: Args_tradeSlippage): string {
    return Entities.tradeSlippage(args);
  }

}
