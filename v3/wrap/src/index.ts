import {
  Args_addCallParameters,
  Args_addDelta,
  Args_approve,
  Args_bestTradeExactIn,
  Args_bestTradeExactOut,
  Args_burnAmountsWithSlippage,
  Args_collectCallParameters,
  Args_collectRewards,
  Args_computePoolAddress,
  Args_createCallParameters,
  Args_createPool,
  Args_createPosition,
  Args_createPositionFromAmount0,
  Args_createPositionFromAmount1,
  Args_createPositionFromAmounts,
  Args_createRoute,
  Args_createTradeExactIn,
  Args_createTradeExactOut,
  Args_createTradeFromRoute,
  Args_createTradeFromRoutes,
  Args_createUncheckedTrade, Args_createUncheckedTradeWithMultipleRoutes,
  Args_currencyEquals,
  Args_deployPool, Args_deployPoolFromTokens,
  Args_encodeDeposit,
  Args_encodeMulticall,
  Args_encodePermit,
  Args_encodeRefundETH,
  Args_encodeRouteToPath,
  Args_encodeSqrtRatioX96,
  Args_encodeSweepToken,
  Args_encodeUnwrapWETH9,
  Args_execCall,
  Args_execSwap,
  Args_FACTORY_ADDRESS,
  Args_feeAmountToTickSpacing,
  Args_fetchPoolFromAddress,
  Args_fetchPoolFromTokens,
  Args_fetchTickList,
  Args_fetchToken,
  Args_getAmount0Delta,
  Args_getAmount1Delta,
  Args_getFeeAmount,
  Args_getNative,
  Args_getNextSqrtPriceFromInput,
  Args_getNextSqrtPriceFromOutput,
  Args_getPermitV,
  Args_getPoolAddress,
  Args_getPoolInputAmount,
  Args_getPoolOutputAmount,
  Args_getPoolTickSpacing,
  Args_getSqrtRatioAtTick,
  Args_getTick,
  Args_getTickAtSqrtRatio,
  Args_getWrappedNative,
  Args_isNative,
  Args_MAX_SQRT_RATIO,
  Args_MAX_TICK,
  Args_maxLiquidityForAmounts,
  Args_MIN_SQRT_RATIO,
  Args_MIN_TICK,
  Args_mintAmounts,
  Args_mintAmountsWithSlippage,
  Args_mostSignificantBit,
  Args_mulDivRoundingUp,
  Args_nearestUsableTick,
  Args_nextInitializedTick,
  Args_nextInitializedTickWithinOneWord,
  Args_POOL_INIT_CODE_HASH,
  Args_poolChainId,
  Args_poolInvolvesToken,
  Args_poolPriceOf, Args_poolToken0Price,
  Args_poolToken1Price,
  Args_positionAmount0,
  Args_positionAmount1,
  Args_positionToken0PriceLower,
  Args_positionToken0PriceUpper,
  Args_priceToClosestTick,
  Args_quoteCallParameters,
  Args_removeCallParameters,
  Args_routeChainId,
  Args_routeMidPrice,
  Args_safeTransferFromParameters,
  Args_swap,
  Args_swapCallParameters,
  Args_swapWithPool,
  Args_tickIsAtOrAboveLargest,
  Args_tickIsBelowSmallest,
  Args_tickListIsSorted,
  Args_tickToPrice,
  Args_toHex,
  Args_tokenAmountEquals,
  Args_tokenEquals, Args_tokenSortsBefore,
  Args_tradeExecutionPrice,
  Args_tradeInputAmount,
  Args_tradeMaximumAmountIn,
  Args_tradeMinimumAmountOut,
  Args_tradeOutputAmount, Args_tradePriceImpact,
  Args_tradeWorstExecutionPrice,
  Args_validateTickList,
  Args_withdrawToken,
  Args_wrapAmount,
  Args_wrapToken, ChainId, Ethers_TxResponse, Fraction, MethodParameters, MintAmounts,
  ModuleBase, NextTickResult, Pool, PoolChangeResult, Position, Price, Route, Tick, Token, TokenAmount, Trade
} from "./wrap";

import * as pool from "./pool";
import * as position from "./position";
import * as router from "./router";
import * as swap from "./swap";
import * as tickList from "./tickList";
import * as token from "./token";
import * as utils from "./utils";
import * as route from "./route";
import * as trade from "./trade";
import { BigInt } from "@polywrap/wasm-as";

export class Module extends ModuleBase {
  FACTORY_ADDRESS(args: Args_FACTORY_ADDRESS): string {
    return utils._FACTORY_ADDRESS;
  }

  MAX_SQRT_RATIO(args: Args_MAX_SQRT_RATIO): BigInt {
    return utils._MAX_SQRT_RATIO;
  }

  MAX_TICK(args: Args_MAX_TICK): i32 {
    return utils._MAX_TICK;
  }

  MIN_SQRT_RATIO(args: Args_MIN_SQRT_RATIO): BigInt {
    return utils._MIN_SQRT_RATIO;
  }

  MIN_TICK(args: Args_MIN_TICK): i32 {
    return utils._MIN_TICK;
  }

  POOL_INIT_CODE_HASH(args: Args_POOL_INIT_CODE_HASH): string {
    return utils._POOL_INIT_CODE_HASH;
  }

  addCallParameters(args: Args_addCallParameters): MethodParameters {
    return position.addCallParameters(args);
  }

  addDelta(args: Args_addDelta): BigInt {
    return utils.addDelta(args);
  }

  approve(args: Args_approve): Ethers_TxResponse {
    return utils.approve(args);
  }

  bestTradeExactIn(args: Args_bestTradeExactIn): Array<Trade> {
    return trade.bestTradeExactIn(args);
  }

  bestTradeExactOut(args: Args_bestTradeExactOut): Array<Trade> {
    return trade.bestTradeExactOut(args);
  }

  burnAmountsWithSlippage(args: Args_burnAmountsWithSlippage): MintAmounts {
    return position.burnAmountsWithSlippage(args);
  }

  collectCallParameters(args: Args_collectCallParameters): MethodParameters {
    return position.collectCallParameters(args);
  }

  collectRewards(args: Args_collectRewards): MethodParameters {
    return utils.collectRewards(args);
  }

  computePoolAddress(args: Args_computePoolAddress): string {
    return pool.computePoolAddress(args);
  }

  createCallParameters(args: Args_createCallParameters): MethodParameters {
    return position.createCallParameters(args);
  }

  createPool(args: Args_createPool): Pool {
    return pool.createPool(args);
  }

  createPosition(args: Args_createPosition): Position {
    return position.createPosition(args);
  }

  createPositionFromAmount0(args: Args_createPositionFromAmount0): Position {
    return position.createPositionFromAmount0(args);
  }

  createPositionFromAmount1(args: Args_createPositionFromAmount1): Position {
    return position.createPositionFromAmount1(args);
  }

  createPositionFromAmounts(args: Args_createPositionFromAmounts): Position {
    return position.createPositionFromAmounts(args);
  }

  createRoute(args: Args_createRoute): Route {
    return route.createRoute(args);
  }

  createTradeExactIn(args: Args_createTradeExactIn): Trade {
    return trade.createTradeExactIn(args);
  }

  createTradeExactOut(args: Args_createTradeExactOut): Trade {
    return trade.createTradeExactOut(args);
  }

  createTradeFromRoute(args: Args_createTradeFromRoute): Trade {
    return trade.createTradeFromRoute(args);
  }

  createTradeFromRoutes(args: Args_createTradeFromRoutes): Trade {
    return trade.createTradeFromRoutes(args);
  }

  createUncheckedTrade(args: Args_createUncheckedTrade): Trade {
    return trade.createUncheckedTrade(args);
  }

  createUncheckedTradeWithMultipleRoutes(args: Args_createUncheckedTradeWithMultipleRoutes): Trade {
    return trade.createUncheckedTradeWithMultipleRoutes(args);
  }

  currencyEquals(args: Args_currencyEquals): bool {
    return token.currencyEquals(args);
  }

  deployPool(args: Args_deployPool): Ethers_TxResponse {
    return utils.deployPool(args);
  }

  deployPoolFromTokens(args: Args_deployPoolFromTokens): Ethers_TxResponse {
    return utils.deployPoolFromTokens(args);
  }

  encodeDeposit(args: Args_encodeDeposit): string {
    return utils.encodeDeposit(args);
  }

  encodeMulticall(args: Args_encodeMulticall): string {
    return router.encodeMulticall(args);
  }

  encodePermit(args: Args_encodePermit): string {
    return router.encodePermit(args);
  }

  encodeRefundETH(args: Args_encodeRefundETH): string {
    return router.encodeRefundETH(args);
  }

  encodeRouteToPath(args: Args_encodeRouteToPath): string {
    return router.encodeRouteToPath(args);
  }

  encodeSqrtRatioX96(args: Args_encodeSqrtRatioX96): BigInt {
    return utils.encodeSqrtRatioX96(args);
  }

  encodeSweepToken(args: Args_encodeSweepToken): string {
    return router.encodeSweepToken(args);
  }

  encodeUnwrapWETH9(args: Args_encodeUnwrapWETH9): string {
    return router.encodeUnwrapWETH9(args);
  }

  execCall(args: Args_execCall): Ethers_TxResponse {
    return utils.execCall(args);
  }

  execSwap(args: Args_execSwap): Ethers_TxResponse {
    return swap.execSwap(args);
  }

  feeAmountToTickSpacing(args: Args_feeAmountToTickSpacing): i32 {
    return utils.feeAmountToTickSpacing(args);
  }

  fetchPoolFromAddress(args: Args_fetchPoolFromAddress): Pool {
    return utils.fetchPoolFromAddress(args);
  }

  fetchPoolFromTokens(args: Args_fetchPoolFromTokens): Pool {
    return utils.fetchPoolFromTokens(args);
  }

  fetchTickList(args: Args_fetchTickList): Array<Tick> {
    return utils.fetchTickList(args);
  }

  fetchToken(args: Args_fetchToken): Token {
    return utils.fetchToken(args);
  }

  getAmount0Delta(args: Args_getAmount0Delta): BigInt {
    return utils.getAmount0Delta(args);
  }

  getAmount1Delta(args: Args_getAmount1Delta): BigInt {
    return utils.getAmount1Delta(args);
  }

  getFeeAmount(args: Args_getFeeAmount): u32 {
    return utils.getFeeAmount(args);
  }

  getNative(args: Args_getNative): Token {
    return token.getNative(args);
  }

  getNextSqrtPriceFromInput(args: Args_getNextSqrtPriceFromInput): BigInt {
    return utils.getNextSqrtPriceFromInput(args);
  }

  getNextSqrtPriceFromOutput(args: Args_getNextSqrtPriceFromOutput): BigInt {
    return utils.getNextSqrtPriceFromOutput(args);
  }

  getPermitV(args: Args_getPermitV): i32 {
    return utils.getPermitV(args);
  }

  getPoolAddress(args: Args_getPoolAddress): string {
    return pool.getPoolAddress(args);
  }

  getPoolInputAmount(args: Args_getPoolInputAmount): PoolChangeResult {
    return pool.getPoolInputAmount(args);
  }

  getPoolOutputAmount(args: Args_getPoolOutputAmount): PoolChangeResult {
    return pool.getPoolOutputAmount(args);
  }

  getPoolTickSpacing(args: Args_getPoolTickSpacing): i32 {
    return pool.getPoolTickSpacing(args);
  }

  getSqrtRatioAtTick(args: Args_getSqrtRatioAtTick): BigInt {
    return tickList.getSqrtRatioAtTick(args);
  }

  getTick(args: Args_getTick): Tick {
    return tickList.getTick(args);
  }

  getTickAtSqrtRatio(args: Args_getTickAtSqrtRatio): i32 {
    return tickList.getTickAtSqrtRatio(args);
  }

  getWrappedNative(args: Args_getWrappedNative): Token {
    return token.getWrappedNative(args);
  }

  isNative(args: Args_isNative): bool {
    return token.isNative(args);
  }

  maxLiquidityForAmounts(args: Args_maxLiquidityForAmounts): BigInt {
    return position.maxLiquidityForAmounts(args);
  }

  mintAmounts(args: Args_mintAmounts): MintAmounts {
    return position.mintAmounts(args);
  }

  mintAmountsWithSlippage(args: Args_mintAmountsWithSlippage): MintAmounts {
    return position.mintAmountsWithSlippage(args);
  }

  mostSignificantBit(args: Args_mostSignificantBit): u32 {
    return utils.mostSignificantBit(args);
  }

  mulDivRoundingUp(args: Args_mulDivRoundingUp): BigInt {
    return utils.mulDivRoundingUp(args);
  }

  nearestUsableTick(args: Args_nearestUsableTick): i32 {
    return tickList.nearestUsableTick(args);
  }

  nextInitializedTick(args: Args_nextInitializedTick): Tick {
    return tickList.nextInitializedTick(args);
  }

  nextInitializedTickWithinOneWord(args: Args_nextInitializedTickWithinOneWord): NextTickResult {
    return tickList.nextInitializedTickWithinOneWord(args);
  }

  poolChainId(args: Args_poolChainId): ChainId {
    return pool.poolChainId(args);
  }

  poolInvolvesToken(args: Args_poolInvolvesToken): bool {
    return pool.poolInvolvesToken(args);
  }

  poolPriceOf(args: Args_poolPriceOf): Price {
    return pool.poolPriceOf(args);
  }

  poolToken0Price(args: Args_poolToken0Price): Price {
    return pool.poolToken0Price(args);
  }

  poolToken1Price(args: Args_poolToken1Price): Price {
    return pool.poolToken1Price(args);
  }

  positionAmount0(args: Args_positionAmount0): TokenAmount {
    return position.positionAmount0(args);
  }

  positionAmount1(args: Args_positionAmount1): TokenAmount {
    return position.positionAmount1(args);
  }

  positionToken0PriceLower(args: Args_positionToken0PriceLower): Price {
    return position.positionToken0PriceLower(args);
  }

  positionToken0PriceUpper(args: Args_positionToken0PriceUpper): Price {
    return position.positionToken0PriceUpper(args);
  }

  priceToClosestTick(args: Args_priceToClosestTick): i32 {
    return tickList.priceToClosestTick(args);
  }

  quoteCallParameters(args: Args_quoteCallParameters): MethodParameters {
    return utils.quoteCallParameters(args);
  }

  removeCallParameters(args: Args_removeCallParameters): MethodParameters {
    return position.removeCallParameters(args);
  }

  routeChainId(args: Args_routeChainId): ChainId {
    return route.routeChainId(args);
  }

  routeMidPrice(args: Args_routeMidPrice): Price {
    return route.routeMidPrice(args);
  }

  safeTransferFromParameters(args: Args_safeTransferFromParameters): MethodParameters {
    return position.safeTransferFromParameters(args);
  }

  swap(args: Args_swap): Ethers_TxResponse {
    return swap.swap(args);
  }

  swapCallParameters(args: Args_swapCallParameters): MethodParameters {
    return router.swapCallParameters(args);
  }

  swapWithPool(args: Args_swapWithPool): Ethers_TxResponse {
    return swap.swapWithPool(args);
  }

  tickIsAtOrAboveLargest(args: Args_tickIsAtOrAboveLargest): bool {
    return tickList.tickIsAtOrAboveLargest(args);
  }

  tickIsBelowSmallest(args: Args_tickIsBelowSmallest): bool {
    return tickList.tickIsBelowSmallest(args);
  }

  tickListIsSorted(args: Args_tickListIsSorted): bool {
    return tickList.tickListIsSorted(args);
  }

  tickToPrice(args: Args_tickToPrice): Price {
    return tickList.tickToPrice(args);
  }

  toHex(args: Args_toHex): string {
    return router.toHex(args);
  }

  tokenAmountEquals(args: Args_tokenAmountEquals): bool {
    return token.tokenAmountEquals(args);
  }

  tokenEquals(args: Args_tokenEquals): bool {
    return token.tokenEquals(args);
  }

  tokenSortsBefore(args: Args_tokenSortsBefore): bool {
    return token.tokenSortsBefore(args);
  }

  tradeExecutionPrice(args: Args_tradeExecutionPrice): Price {
    return trade.tradeExecutionPrice(args);
  }

  tradeInputAmount(args: Args_tradeInputAmount): TokenAmount {
    return trade.tradeInputAmount(args);
  }

  tradeMaximumAmountIn(args: Args_tradeMaximumAmountIn): TokenAmount {
    return trade.tradeMaximumAmountIn(args);
  }

  tradeMinimumAmountOut(args: Args_tradeMinimumAmountOut): TokenAmount {
    return trade.tradeMinimumAmountOut(args);
  }

  tradeOutputAmount(args: Args_tradeOutputAmount): TokenAmount {
    return trade.tradeOutputAmount(args);
  }

  tradePriceImpact(args: Args_tradePriceImpact): Fraction {
    return trade.tradePriceImpact(args);
  }

  tradeWorstExecutionPrice(args: Args_tradeWorstExecutionPrice): Price {
    return trade.tradeWorstExecutionPrice(args);
  }

  validateTickList(args: Args_validateTickList): bool {
    return tickList.validateTickList(args);
  }

  withdrawToken(args: Args_withdrawToken): MethodParameters {
    return utils.withdrawToken(args);
  }

  wrapAmount(args: Args_wrapAmount): TokenAmount {
    return token.wrapAmount(args);
  }

  wrapToken(args: Args_wrapToken): Token {
    return token.wrapToken(args);
  }

}