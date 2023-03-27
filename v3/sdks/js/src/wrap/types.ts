// @ts-ignore
import * as Types from "./";

// @ts-ignore
import {
  CoreClient,
  InvokeResult,
  Uri,
} from "@polywrap/core-js";

export type UInt = number;
export type UInt8 = number;
export type UInt16 = number;
export type UInt32 = number;
export type Int = number;
export type Int8 = number;
export type Int16 = number;
export type Int32 = number;
export type Bytes = Uint8Array;
export type BigInt = string;
export type BigNumber = string;
export type Json = string;
export type String = string;
export type Boolean = boolean;

/// Imported Objects START ///

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Token {
  chainId: Types.UniswapV3_ChainId;
  address: Types.String;
  currency: Types.UniswapV3_Currency;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Currency {
  decimals: Types.UInt8;
  symbol?: Types.String | null;
  name?: Types.String | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Price {
  baseToken: Types.UniswapV3_Token;
  quoteToken: Types.UniswapV3_Token;
  denominator: Types.BigInt;
  numerator: Types.BigInt;
  price: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Fraction {
  numerator: Types.BigInt;
  denominator: Types.BigInt;
  quotient: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_TokenAmount {
  token: Types.UniswapV3_Token;
  amount: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Tick {
  index: Types.Int32;
  liquidityGross: Types.BigInt;
  liquidityNet: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Pool {
  token0: Types.UniswapV3_Token;
  token1: Types.UniswapV3_Token;
  fee: Types.UniswapV3_FeeAmount;
  sqrtRatioX96: Types.BigInt;
  liquidity: Types.BigInt;
  tickCurrent: Types.Int32;
  tickDataProvider: Array<Types.UniswapV3_Tick>;
  token0Price: Types.UniswapV3_Price;
  token1Price: Types.UniswapV3_Price;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Route {
  pools: Array<Types.UniswapV3_Pool>;
  path: Array<Types.UniswapV3_Token>;
  input: Types.UniswapV3_Token;
  output: Types.UniswapV3_Token;
  midPrice: Types.UniswapV3_Price;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_BestTradeOptions {
  maxNumResults?: Types.UInt32 | null;
  maxHops?: Types.UInt32 | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_TradeSwap {
  route: Types.UniswapV3_Route;
  inputAmount: Types.UniswapV3_TokenAmount;
  outputAmount: Types.UniswapV3_TokenAmount;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Trade {
  swaps: Array<Types.UniswapV3_TradeSwap>;
  tradeType: Types.UniswapV3_TradeType;
  inputAmount: Types.UniswapV3_TokenAmount;
  outputAmount: Types.UniswapV3_TokenAmount;
  executionPrice: Types.UniswapV3_Price;
  priceImpact: Types.UniswapV3_Fraction;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_MintAmounts {
  amount0: Types.BigInt;
  amount1: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Position {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
  tickUpper: Types.Int32;
  liquidity: Types.BigInt;
  token0Amount: Types.UniswapV3_TokenAmount;
  token1Amount: Types.UniswapV3_TokenAmount;
  mintAmounts: Types.UniswapV3_MintAmounts;
  token0PriceLower: Types.UniswapV3_Price;
  token0PriceUpper: Types.UniswapV3_Price;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_PermitOptions {
  v: Types.UniswapV3_PermitV;
  r: Types.String;
  s: Types.String;
  amount?: Types.BigInt | null;
  deadline?: Types.BigInt | null;
  nonce?: Types.BigInt | null;
  expiry?: Types.BigInt | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_FeeOptions {
  fee: Types.String;
  recipient: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_SwapOptions {
  slippageTolerance: Types.String;
  recipient: Types.String;
  deadline: Types.BigInt;
  inputTokenPermit?: Types.UniswapV3_PermitOptions | null;
  sqrtPriceLimitX96?: Types.BigInt | null;
  fee?: Types.UniswapV3_FeeOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_MethodParameters {
  calldata: Types.String;
  value: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_GasOptions {
  gasPrice?: Types.BigInt | null;
  gasLimit?: Types.BigInt | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_NextTickResult {
  index: Types.Int32;
  found: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_PoolChangeResult {
  amount: Types.UniswapV3_TokenAmount;
  nextPool: Types.UniswapV3_Pool;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_TradeRoute {
  route: Types.UniswapV3_Route;
  amount: Types.UniswapV3_TokenAmount;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_IncentiveKey {
  rewardToken: Types.UniswapV3_Token;
  pool: Types.UniswapV3_Pool;
  startTime: Types.BigInt;
  endTime: Types.BigInt;
  refundee: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_ClaimOptions {
  tokenId: Types.BigInt;
  recipient: Types.String;
  amount?: Types.BigInt | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_FullWithdrawOptions {
  owner: Types.String;
  data?: Types.String | null;
  tokenId: Types.BigInt;
  recipient: Types.String;
  amount?: Types.BigInt | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_QuoteOptions {
  sqrtPriceLimitX96?: Types.BigInt | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_CommonAddLiquidityOptions {
  slippageTolerance: Types.String;
  deadline: Types.BigInt;
  useNative?: Types.UniswapV3_Token | null;
  token0Permit?: Types.UniswapV3_PermitOptions | null;
  token1Permit?: Types.UniswapV3_PermitOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_AddLiquidityOptions {
  recipient?: Types.String | null;
  createPool?: Types.Boolean | null;
  tokenId?: Types.BigInt | null;
  slippageTolerance: Types.String;
  deadline: Types.BigInt;
  useNative?: Types.UniswapV3_Token | null;
  token0Permit?: Types.UniswapV3_PermitOptions | null;
  token1Permit?: Types.UniswapV3_PermitOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_SafeTransferOptions {
  sender: Types.String;
  recipient: Types.String;
  tokenId: Types.BigInt;
  data?: Types.String | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_CollectOptions {
  tokenId: Types.BigInt;
  expectedCurrencyOwed0: Types.UniswapV3_TokenAmount;
  expectedCurrencyOwed1: Types.UniswapV3_TokenAmount;
  recipient: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_NFTPermitOptions {
  v: Types.UniswapV3_PermitV;
  r: Types.String;
  s: Types.String;
  deadline: Types.BigInt;
  spender: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_RemoveLiquidityOptions {
  tokenId: Types.BigInt;
  liquidityPercentage: Types.String;
  slippageTolerance: Types.String;
  deadline: Types.BigInt;
  burnToken?: Types.Boolean | null;
  permit?: Types.UniswapV3_NFTPermitOptions | null;
  collectOptions: Types.UniswapV3_CollectOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Ethereum_TxResponse {
  hash: Types.String;
  to?: Types.String | null;
  from: Types.String;
  nonce: Types.UInt32;
  gasLimit: Types.BigInt;
  maxFeePerGas?: Types.BigInt | null;
  maxPriorityFeePerGas?: Types.BigInt | null;
  gasPrice?: Types.BigInt | null;
  value: Types.BigInt;
  chainId: Types.BigInt;
  blockNumber?: Types.BigInt | null;
  blockHash?: Types.String | null;
  timestamp?: Types.UInt32 | null;
  r?: Types.String | null;
  s?: Types.String | null;
  v?: Types.UInt32 | null;
  type?: Types.UInt32 | null;
  accessList?: Array<Types.UniswapV3_Ethereum_AccessItem> | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Ethereum_AccessItem {
  address: Types.String;
  storageKeys: Array<Types.String>;
}

/// Imported Objects END ///

/// Imported Enums START ///

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export enum UniswapV3_ChainIdEnum {
  MAINNET,
  ROPSTEN,
  RINKEBY,
  GOERLI,
  KOVAN,
  OPTIMISM,
  OPTIMISTIC_KOVAN,
  ARBITRUM_ONE,
  ARBITRUM_RINKEBY,
  POLYGON,
  POLYGON_MUMBAI,
}

export type UniswapV3_ChainIdString =
  | "MAINNET"
  | "ROPSTEN"
  | "RINKEBY"
  | "GOERLI"
  | "KOVAN"
  | "OPTIMISM"
  | "OPTIMISTIC_KOVAN"
  | "ARBITRUM_ONE"
  | "ARBITRUM_RINKEBY"
  | "POLYGON"
  | "POLYGON_MUMBAI"

export type UniswapV3_ChainId = UniswapV3_ChainIdEnum | UniswapV3_ChainIdString;

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export enum UniswapV3_FeeAmountEnum {
  LOWEST,
  LOW,
  MEDIUM,
  HIGH,
}

export type UniswapV3_FeeAmountString =
  | "LOWEST"
  | "LOW"
  | "MEDIUM"
  | "HIGH"

export type UniswapV3_FeeAmount = UniswapV3_FeeAmountEnum | UniswapV3_FeeAmountString;

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export enum UniswapV3_TradeTypeEnum {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export type UniswapV3_TradeTypeString =
  | "EXACT_INPUT"
  | "EXACT_OUTPUT"

export type UniswapV3_TradeType = UniswapV3_TradeTypeEnum | UniswapV3_TradeTypeString;

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export enum UniswapV3_PermitVEnum {
  v_0,
  v_1,
  v_27,
  v_28,
}

export type UniswapV3_PermitVString =
  | "v_0"
  | "v_1"
  | "v_27"
  | "v_28"

export type UniswapV3_PermitV = UniswapV3_PermitVEnum | UniswapV3_PermitVString;

/// Imported Enums END ///

/// Imported Modules START ///

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_approve {
  token: Types.UniswapV3_Token;
  amount?: Types.BigInt | null;
  gasOptions?: Types.UniswapV3_GasOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_execCall {
  parameters: Types.UniswapV3_MethodParameters;
  address: Types.String;
  chainId: Types.UniswapV3_ChainId;
  gasOptions?: Types.UniswapV3_GasOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_execSwap {
  trades: Array<Types.UniswapV3_Trade>;
  swapOptions: Types.UniswapV3_SwapOptions;
  gasOptions?: Types.UniswapV3_GasOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_swap {
  inToken: Types.UniswapV3_Token;
  outToken: Types.UniswapV3_Token;
  fee: Types.UniswapV3_FeeAmount;
  amount: Types.BigInt;
  tradeType: Types.UniswapV3_TradeType;
  swapOptions: Types.UniswapV3_SwapOptions;
  gasOptions?: Types.UniswapV3_GasOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_swapWithPool {
  address: Types.String;
  amount: Types.UniswapV3_TokenAmount;
  tradeType: Types.UniswapV3_TradeType;
  swapOptions: Types.UniswapV3_SwapOptions;
  gasOptions?: Types.UniswapV3_GasOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_deployPool {
  pool: Types.UniswapV3_Pool;
  gasOptions?: Types.UniswapV3_GasOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_deployPoolFromTokens {
  tokenA: Types.UniswapV3_Token;
  tokenB: Types.UniswapV3_Token;
  fee: Types.UniswapV3_FeeAmount;
  gasOptions?: Types.UniswapV3_GasOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_currencyEquals {
  currencyA: Types.UniswapV3_Currency;
  currencyB: Types.UniswapV3_Currency;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tokenEquals {
  tokenA: Types.UniswapV3_Token;
  tokenB: Types.UniswapV3_Token;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tokenAmountEquals {
  tokenAmountA: Types.UniswapV3_TokenAmount;
  tokenAmountB: Types.UniswapV3_TokenAmount;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tokenSortsBefore {
  tokenA: Types.UniswapV3_Token;
  tokenB: Types.UniswapV3_Token;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getNative {
  chainId: Types.UniswapV3_ChainId;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getWrappedNative {
  chainId: Types.UniswapV3_ChainId;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_isNative {
  token: Types.UniswapV3_Token;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_wrapToken {
  token: Types.UniswapV3_Token;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_wrapAmount {
  amount: Types.UniswapV3_TokenAmount;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_validateTickList {
  ticks: Array<Types.UniswapV3_Tick>;
  tickSpacing: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getTick {
  tickDataProvider: Array<Types.UniswapV3_Tick>;
  tickIndex: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_nextInitializedTickWithinOneWord {
  tickDataProvider: Array<Types.UniswapV3_Tick>;
  tick: Types.Int32;
  lte: Types.Boolean;
  tickSpacing: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createPool {
  tokenA: Types.UniswapV3_Token;
  tokenB: Types.UniswapV3_Token;
  fee: Types.UniswapV3_FeeAmount;
  sqrtRatioX96: Types.BigInt;
  liquidity: Types.BigInt;
  tickCurrent: Types.Int32;
  ticks?: Array<Types.UniswapV3_Tick> | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getPoolAddress {
  tokenA: Types.UniswapV3_Token;
  tokenB: Types.UniswapV3_Token;
  fee: Types.UniswapV3_FeeAmount;
  initCodeHashManualOverride?: Types.String | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_poolInvolvesToken {
  pool: Types.UniswapV3_Pool;
  token: Types.UniswapV3_Token;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_poolToken0Price {
  token0: Types.UniswapV3_Token;
  token1: Types.UniswapV3_Token;
  sqrtRatioX96: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_poolToken1Price {
  token0: Types.UniswapV3_Token;
  token1: Types.UniswapV3_Token;
  sqrtRatioX96: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_poolPriceOf {
  pool: Types.UniswapV3_Pool;
  token: Types.UniswapV3_Token;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_poolChainId {
  pool: Types.UniswapV3_Pool;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getPoolOutputAmount {
  pool: Types.UniswapV3_Pool;
  inputAmount: Types.UniswapV3_TokenAmount;
  sqrtPriceLimitX96?: Types.BigInt | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getPoolInputAmount {
  pool: Types.UniswapV3_Pool;
  outputAmount: Types.UniswapV3_TokenAmount;
  sqrtPriceLimitX96?: Types.BigInt | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getPoolTickSpacing {
  pool: Types.UniswapV3_Pool;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createRoute {
  pools: Array<Types.UniswapV3_Pool>;
  inToken: Types.UniswapV3_Token;
  outToken: Types.UniswapV3_Token;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_routeChainId {
  route: Types.UniswapV3_Route;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_routeMidPrice {
  pools: Array<Types.UniswapV3_Pool>;
  inToken: Types.UniswapV3_Token;
  outToken: Types.UniswapV3_Token;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createTradeExactIn {
  tradeRoute: Types.UniswapV3_TradeRoute;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createTradeExactOut {
  tradeRoute: Types.UniswapV3_TradeRoute;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createTradeFromRoute {
  tradeRoute: Types.UniswapV3_TradeRoute;
  tradeType: Types.UniswapV3_TradeType;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createTradeFromRoutes {
  tradeRoutes: Array<Types.UniswapV3_TradeRoute>;
  tradeType: Types.UniswapV3_TradeType;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createUncheckedTrade {
  swap: Types.UniswapV3_TradeSwap;
  tradeType: Types.UniswapV3_TradeType;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createUncheckedTradeWithMultipleRoutes {
  swaps: Array<Types.UniswapV3_TradeSwap>;
  tradeType: Types.UniswapV3_TradeType;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tradeInputAmount {
  swaps: Array<Types.UniswapV3_TradeSwap>;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tradeOutputAmount {
  swaps: Array<Types.UniswapV3_TradeSwap>;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tradeExecutionPrice {
  inputAmount: Types.UniswapV3_TokenAmount;
  outputAmount: Types.UniswapV3_TokenAmount;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tradePriceImpact {
  swaps: Array<Types.UniswapV3_TradeSwap>;
  outputAmount: Types.UniswapV3_TokenAmount;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tradeMinimumAmountOut {
  slippageTolerance: Types.String;
  amountOut: Types.UniswapV3_TokenAmount;
  tradeType: Types.UniswapV3_TradeType;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tradeMaximumAmountIn {
  slippageTolerance: Types.String;
  amountIn: Types.UniswapV3_TokenAmount;
  tradeType: Types.UniswapV3_TradeType;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tradeWorstExecutionPrice {
  trade: Types.UniswapV3_Trade;
  slippageTolerance: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_bestTradeExactIn {
  pools: Array<Types.UniswapV3_Pool>;
  amountIn: Types.UniswapV3_TokenAmount;
  tokenOut: Types.UniswapV3_Token;
  options?: Types.UniswapV3_BestTradeOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_bestTradeExactOut {
  pools: Array<Types.UniswapV3_Pool>;
  tokenIn: Types.UniswapV3_Token;
  amountOut: Types.UniswapV3_TokenAmount;
  options?: Types.UniswapV3_BestTradeOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createPosition {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
  tickUpper: Types.Int32;
  liquidity: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createPositionFromAmounts {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
  tickUpper: Types.Int32;
  amount0: Types.BigInt;
  amount1: Types.BigInt;
  useFullPrecision: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createPositionFromAmount0 {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
  tickUpper: Types.Int32;
  amount0: Types.BigInt;
  useFullPrecision: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createPositionFromAmount1 {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
  tickUpper: Types.Int32;
  amount1: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_positionToken0PriceLower {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_positionToken0PriceUpper {
  pool: Types.UniswapV3_Pool;
  tickUpper: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_positionAmount0 {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
  tickUpper: Types.Int32;
  liquidity: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_positionAmount1 {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
  tickUpper: Types.Int32;
  liquidity: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_mintAmounts {
  pool: Types.UniswapV3_Pool;
  tickLower: Types.Int32;
  tickUpper: Types.Int32;
  liquidity: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_mintAmountsWithSlippage {
  position: Types.UniswapV3_Position;
  slippageTolerance: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_burnAmountsWithSlippage {
  position: Types.UniswapV3_Position;
  slippageTolerance: Types.String;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_swapCallParameters {
  trades: Array<Types.UniswapV3_Trade>;
  options: Types.UniswapV3_SwapOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_encodeRouteToPath {
  route: Types.UniswapV3_Route;
  exactOutput: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_encodePermit {
  token: Types.UniswapV3_Token;
  options: Types.UniswapV3_PermitOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_encodeUnwrapWETH9 {
  amountMinimum: Types.BigInt;
  recipient: Types.String;
  feeOptions?: Types.UniswapV3_FeeOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_encodeSweepToken {
  token: Types.UniswapV3_Token;
  amountMinimum: Types.BigInt;
  recipient: Types.String;
  feeOptions?: Types.UniswapV3_FeeOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_encodeRefundETH {
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_encodeMulticall {
  calldatas: Array<Types.String>;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_collectRewards {
  incentiveKeys: Array<Types.UniswapV3_IncentiveKey>;
  options: Types.UniswapV3_ClaimOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_withdrawToken {
  incentiveKeys: Array<Types.UniswapV3_IncentiveKey>;
  options: Types.UniswapV3_FullWithdrawOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_encodeDeposit {
  incentiveKeys: Array<Types.UniswapV3_IncentiveKey>;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_quoteCallParameters {
  route: Types.UniswapV3_Route;
  amount: Types.UniswapV3_TokenAmount;
  tradeType: Types.UniswapV3_TradeType;
  options?: Types.UniswapV3_QuoteOptions | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_createCallParameters {
  pool: Types.UniswapV3_Pool;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_addCallParameters {
  position: Types.UniswapV3_Position;
  options: Types.UniswapV3_AddLiquidityOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_collectCallParameters {
  options: Types.UniswapV3_CollectOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_removeCallParameters {
  position: Types.UniswapV3_Position;
  options: Types.UniswapV3_RemoveLiquidityOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_safeTransferFromParameters {
  options: Types.UniswapV3_SafeTransferOptions;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_toHex {
  value: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_computePoolAddress {
  factoryAddress: Types.String;
  tokenA: Types.UniswapV3_Token;
  tokenB: Types.UniswapV3_Token;
  fee: Types.UniswapV3_FeeAmount;
  initCodeHashManualOverride?: Types.String | null;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_encodeSqrtRatioX96 {
  amount1: Types.BigInt;
  amount0: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_mulDivRoundingUp {
  a: Types.BigInt;
  b: Types.BigInt;
  denominator: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_addDelta {
  x: Types.BigInt;
  y: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_maxLiquidityForAmounts {
  sqrtRatioCurrentX96: Types.BigInt;
  sqrtRatioAX96: Types.BigInt;
  sqrtRatioBX96: Types.BigInt;
  amount0: Types.BigInt;
  amount1: Types.BigInt;
  useFullPrecision: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_mostSignificantBit {
  x: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_nearestUsableTick {
  tick: Types.Int32;
  tickSpacing: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tickToPrice {
  baseToken: Types.UniswapV3_Token;
  quoteToken: Types.UniswapV3_Token;
  tick: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_priceToClosestTick {
  price: Types.UniswapV3_Price;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getAmount0Delta {
  sqrtRatioAX96: Types.BigInt;
  sqrtRatioBX96: Types.BigInt;
  liquidity: Types.BigInt;
  roundUp: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getAmount1Delta {
  sqrtRatioAX96: Types.BigInt;
  sqrtRatioBX96: Types.BigInt;
  liquidity: Types.BigInt;
  roundUp: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getNextSqrtPriceFromInput {
  sqrtPX96: Types.BigInt;
  liquidity: Types.BigInt;
  amountIn: Types.BigInt;
  zeroForOne: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getNextSqrtPriceFromOutput {
  sqrtPX96: Types.BigInt;
  liquidity: Types.BigInt;
  amountOut: Types.BigInt;
  zeroForOne: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tickIsBelowSmallest {
  ticks: Array<Types.UniswapV3_Tick>;
  tick: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tickIsAtOrAboveLargest {
  ticks: Array<Types.UniswapV3_Tick>;
  tick: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_nextInitializedTick {
  ticks: Array<Types.UniswapV3_Tick>;
  tick: Types.Int32;
  lte: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_tickListIsSorted {
  ticks: Array<Types.UniswapV3_Tick>;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getSqrtRatioAtTick {
  tick: Types.Int32;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getTickAtSqrtRatio {
  sqrtRatioX96: Types.BigInt;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_fetchToken {
  address: Types.String;
  chainId: Types.UniswapV3_ChainId;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_fetchPoolFromTokens {
  tokenA: Types.UniswapV3_Token;
  tokenB: Types.UniswapV3_Token;
  fee: Types.UniswapV3_FeeAmount;
  fetchTicks: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_fetchPoolFromAddress {
  address: Types.String;
  chainId: Types.UniswapV3_ChainId;
  fetchTicks: Types.Boolean;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_fetchTickList {
  address: Types.String;
  chainId: Types.UniswapV3_ChainId;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_feeAmountToTickSpacing {
  feeAmount: Types.UniswapV3_FeeAmount;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getFeeAmount {
  feeAmount: Types.UniswapV3_FeeAmount;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_getPermitV {
  permitV: Types.UniswapV3_PermitV;
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_FACTORY_ADDRESS {
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_POOL_INIT_CODE_HASH {
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_MIN_TICK {
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_MAX_TICK {
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_MIN_SQRT_RATIO {
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export interface UniswapV3_Module_Args_MAX_SQRT_RATIO {
}

/* URI: "ens/uniswap.wraps.eth:v3@1.0.0" */
export const UniswapV3_Module = {
  approve: async (
    args: UniswapV3_Module_Args_approve,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Ethereum_TxResponse>> => {
    return client.invoke<Types.UniswapV3_Ethereum_TxResponse>({
      uri: Uri.from(uri),
      method: "approve",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  execCall: async (
    args: UniswapV3_Module_Args_execCall,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Ethereum_TxResponse>> => {
    return client.invoke<Types.UniswapV3_Ethereum_TxResponse>({
      uri: Uri.from(uri),
      method: "execCall",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  execSwap: async (
    args: UniswapV3_Module_Args_execSwap,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Ethereum_TxResponse>> => {
    return client.invoke<Types.UniswapV3_Ethereum_TxResponse>({
      uri: Uri.from(uri),
      method: "execSwap",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  swap: async (
    args: UniswapV3_Module_Args_swap,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Ethereum_TxResponse>> => {
    return client.invoke<Types.UniswapV3_Ethereum_TxResponse>({
      uri: Uri.from(uri),
      method: "swap",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  swapWithPool: async (
    args: UniswapV3_Module_Args_swapWithPool,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Ethereum_TxResponse>> => {
    return client.invoke<Types.UniswapV3_Ethereum_TxResponse>({
      uri: Uri.from(uri),
      method: "swapWithPool",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  deployPool: async (
    args: UniswapV3_Module_Args_deployPool,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Ethereum_TxResponse>> => {
    return client.invoke<Types.UniswapV3_Ethereum_TxResponse>({
      uri: Uri.from(uri),
      method: "deployPool",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  deployPoolFromTokens: async (
    args: UniswapV3_Module_Args_deployPoolFromTokens,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Ethereum_TxResponse>> => {
    return client.invoke<Types.UniswapV3_Ethereum_TxResponse>({
      uri: Uri.from(uri),
      method: "deployPoolFromTokens",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  currencyEquals: async (
    args: UniswapV3_Module_Args_currencyEquals,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "currencyEquals",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tokenEquals: async (
    args: UniswapV3_Module_Args_tokenEquals,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "tokenEquals",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tokenAmountEquals: async (
    args: UniswapV3_Module_Args_tokenAmountEquals,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "tokenAmountEquals",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tokenSortsBefore: async (
    args: UniswapV3_Module_Args_tokenSortsBefore,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "tokenSortsBefore",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getNative: async (
    args: UniswapV3_Module_Args_getNative,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Token>> => {
    return client.invoke<Types.UniswapV3_Token>({
      uri: Uri.from(uri),
      method: "getNative",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getWrappedNative: async (
    args: UniswapV3_Module_Args_getWrappedNative,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Token>> => {
    return client.invoke<Types.UniswapV3_Token>({
      uri: Uri.from(uri),
      method: "getWrappedNative",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  isNative: async (
    args: UniswapV3_Module_Args_isNative,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "isNative",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  wrapToken: async (
    args: UniswapV3_Module_Args_wrapToken,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Token>> => {
    return client.invoke<Types.UniswapV3_Token>({
      uri: Uri.from(uri),
      method: "wrapToken",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  wrapAmount: async (
    args: UniswapV3_Module_Args_wrapAmount,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_TokenAmount>> => {
    return client.invoke<Types.UniswapV3_TokenAmount>({
      uri: Uri.from(uri),
      method: "wrapAmount",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  validateTickList: async (
    args: UniswapV3_Module_Args_validateTickList,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "validateTickList",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getTick: async (
    args: UniswapV3_Module_Args_getTick,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Tick>> => {
    return client.invoke<Types.UniswapV3_Tick>({
      uri: Uri.from(uri),
      method: "getTick",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  nextInitializedTickWithinOneWord: async (
    args: UniswapV3_Module_Args_nextInitializedTickWithinOneWord,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_NextTickResult>> => {
    return client.invoke<Types.UniswapV3_NextTickResult>({
      uri: Uri.from(uri),
      method: "nextInitializedTickWithinOneWord",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createPool: async (
    args: UniswapV3_Module_Args_createPool,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Pool>> => {
    return client.invoke<Types.UniswapV3_Pool>({
      uri: Uri.from(uri),
      method: "createPool",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getPoolAddress: async (
    args: UniswapV3_Module_Args_getPoolAddress,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "getPoolAddress",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  poolInvolvesToken: async (
    args: UniswapV3_Module_Args_poolInvolvesToken,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "poolInvolvesToken",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  poolToken0Price: async (
    args: UniswapV3_Module_Args_poolToken0Price,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "poolToken0Price",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  poolToken1Price: async (
    args: UniswapV3_Module_Args_poolToken1Price,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "poolToken1Price",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  poolPriceOf: async (
    args: UniswapV3_Module_Args_poolPriceOf,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "poolPriceOf",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  poolChainId: async (
    args: UniswapV3_Module_Args_poolChainId,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_ChainId>> => {
    return client.invoke<Types.UniswapV3_ChainId>({
      uri: Uri.from(uri),
      method: "poolChainId",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getPoolOutputAmount: async (
    args: UniswapV3_Module_Args_getPoolOutputAmount,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_PoolChangeResult>> => {
    return client.invoke<Types.UniswapV3_PoolChangeResult>({
      uri: Uri.from(uri),
      method: "getPoolOutputAmount",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getPoolInputAmount: async (
    args: UniswapV3_Module_Args_getPoolInputAmount,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_PoolChangeResult>> => {
    return client.invoke<Types.UniswapV3_PoolChangeResult>({
      uri: Uri.from(uri),
      method: "getPoolInputAmount",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getPoolTickSpacing: async (
    args: UniswapV3_Module_Args_getPoolTickSpacing,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Int32>> => {
    return client.invoke<Types.Int32>({
      uri: Uri.from(uri),
      method: "getPoolTickSpacing",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createRoute: async (
    args: UniswapV3_Module_Args_createRoute,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Route>> => {
    return client.invoke<Types.UniswapV3_Route>({
      uri: Uri.from(uri),
      method: "createRoute",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  routeChainId: async (
    args: UniswapV3_Module_Args_routeChainId,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_ChainId>> => {
    return client.invoke<Types.UniswapV3_ChainId>({
      uri: Uri.from(uri),
      method: "routeChainId",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  routeMidPrice: async (
    args: UniswapV3_Module_Args_routeMidPrice,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "routeMidPrice",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createTradeExactIn: async (
    args: UniswapV3_Module_Args_createTradeExactIn,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Trade>> => {
    return client.invoke<Types.UniswapV3_Trade>({
      uri: Uri.from(uri),
      method: "createTradeExactIn",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createTradeExactOut: async (
    args: UniswapV3_Module_Args_createTradeExactOut,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Trade>> => {
    return client.invoke<Types.UniswapV3_Trade>({
      uri: Uri.from(uri),
      method: "createTradeExactOut",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createTradeFromRoute: async (
    args: UniswapV3_Module_Args_createTradeFromRoute,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Trade>> => {
    return client.invoke<Types.UniswapV3_Trade>({
      uri: Uri.from(uri),
      method: "createTradeFromRoute",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createTradeFromRoutes: async (
    args: UniswapV3_Module_Args_createTradeFromRoutes,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Trade>> => {
    return client.invoke<Types.UniswapV3_Trade>({
      uri: Uri.from(uri),
      method: "createTradeFromRoutes",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createUncheckedTrade: async (
    args: UniswapV3_Module_Args_createUncheckedTrade,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Trade>> => {
    return client.invoke<Types.UniswapV3_Trade>({
      uri: Uri.from(uri),
      method: "createUncheckedTrade",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createUncheckedTradeWithMultipleRoutes: async (
    args: UniswapV3_Module_Args_createUncheckedTradeWithMultipleRoutes,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Trade>> => {
    return client.invoke<Types.UniswapV3_Trade>({
      uri: Uri.from(uri),
      method: "createUncheckedTradeWithMultipleRoutes",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tradeInputAmount: async (
    args: UniswapV3_Module_Args_tradeInputAmount,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_TokenAmount>> => {
    return client.invoke<Types.UniswapV3_TokenAmount>({
      uri: Uri.from(uri),
      method: "tradeInputAmount",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tradeOutputAmount: async (
    args: UniswapV3_Module_Args_tradeOutputAmount,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_TokenAmount>> => {
    return client.invoke<Types.UniswapV3_TokenAmount>({
      uri: Uri.from(uri),
      method: "tradeOutputAmount",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tradeExecutionPrice: async (
    args: UniswapV3_Module_Args_tradeExecutionPrice,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "tradeExecutionPrice",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tradePriceImpact: async (
    args: UniswapV3_Module_Args_tradePriceImpact,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Fraction>> => {
    return client.invoke<Types.UniswapV3_Fraction>({
      uri: Uri.from(uri),
      method: "tradePriceImpact",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tradeMinimumAmountOut: async (
    args: UniswapV3_Module_Args_tradeMinimumAmountOut,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_TokenAmount>> => {
    return client.invoke<Types.UniswapV3_TokenAmount>({
      uri: Uri.from(uri),
      method: "tradeMinimumAmountOut",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tradeMaximumAmountIn: async (
    args: UniswapV3_Module_Args_tradeMaximumAmountIn,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_TokenAmount>> => {
    return client.invoke<Types.UniswapV3_TokenAmount>({
      uri: Uri.from(uri),
      method: "tradeMaximumAmountIn",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tradeWorstExecutionPrice: async (
    args: UniswapV3_Module_Args_tradeWorstExecutionPrice,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "tradeWorstExecutionPrice",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  bestTradeExactIn: async (
    args: UniswapV3_Module_Args_bestTradeExactIn,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Array<Types.UniswapV3_Trade>>> => {
    return client.invoke<Array<Types.UniswapV3_Trade>>({
      uri: Uri.from(uri),
      method: "bestTradeExactIn",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  bestTradeExactOut: async (
    args: UniswapV3_Module_Args_bestTradeExactOut,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Array<Types.UniswapV3_Trade>>> => {
    return client.invoke<Array<Types.UniswapV3_Trade>>({
      uri: Uri.from(uri),
      method: "bestTradeExactOut",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createPosition: async (
    args: UniswapV3_Module_Args_createPosition,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Position>> => {
    return client.invoke<Types.UniswapV3_Position>({
      uri: Uri.from(uri),
      method: "createPosition",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createPositionFromAmounts: async (
    args: UniswapV3_Module_Args_createPositionFromAmounts,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Position>> => {
    return client.invoke<Types.UniswapV3_Position>({
      uri: Uri.from(uri),
      method: "createPositionFromAmounts",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createPositionFromAmount0: async (
    args: UniswapV3_Module_Args_createPositionFromAmount0,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Position>> => {
    return client.invoke<Types.UniswapV3_Position>({
      uri: Uri.from(uri),
      method: "createPositionFromAmount0",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createPositionFromAmount1: async (
    args: UniswapV3_Module_Args_createPositionFromAmount1,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Position>> => {
    return client.invoke<Types.UniswapV3_Position>({
      uri: Uri.from(uri),
      method: "createPositionFromAmount1",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  positionToken0PriceLower: async (
    args: UniswapV3_Module_Args_positionToken0PriceLower,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "positionToken0PriceLower",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  positionToken0PriceUpper: async (
    args: UniswapV3_Module_Args_positionToken0PriceUpper,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "positionToken0PriceUpper",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  positionAmount0: async (
    args: UniswapV3_Module_Args_positionAmount0,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_TokenAmount>> => {
    return client.invoke<Types.UniswapV3_TokenAmount>({
      uri: Uri.from(uri),
      method: "positionAmount0",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  positionAmount1: async (
    args: UniswapV3_Module_Args_positionAmount1,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_TokenAmount>> => {
    return client.invoke<Types.UniswapV3_TokenAmount>({
      uri: Uri.from(uri),
      method: "positionAmount1",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  mintAmounts: async (
    args: UniswapV3_Module_Args_mintAmounts,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MintAmounts>> => {
    return client.invoke<Types.UniswapV3_MintAmounts>({
      uri: Uri.from(uri),
      method: "mintAmounts",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  mintAmountsWithSlippage: async (
    args: UniswapV3_Module_Args_mintAmountsWithSlippage,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MintAmounts>> => {
    return client.invoke<Types.UniswapV3_MintAmounts>({
      uri: Uri.from(uri),
      method: "mintAmountsWithSlippage",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  burnAmountsWithSlippage: async (
    args: UniswapV3_Module_Args_burnAmountsWithSlippage,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MintAmounts>> => {
    return client.invoke<Types.UniswapV3_MintAmounts>({
      uri: Uri.from(uri),
      method: "burnAmountsWithSlippage",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  swapCallParameters: async (
    args: UniswapV3_Module_Args_swapCallParameters,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "swapCallParameters",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  encodeRouteToPath: async (
    args: UniswapV3_Module_Args_encodeRouteToPath,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "encodeRouteToPath",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  encodePermit: async (
    args: UniswapV3_Module_Args_encodePermit,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "encodePermit",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  encodeUnwrapWETH9: async (
    args: UniswapV3_Module_Args_encodeUnwrapWETH9,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "encodeUnwrapWETH9",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  encodeSweepToken: async (
    args: UniswapV3_Module_Args_encodeSweepToken,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "encodeSweepToken",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  encodeRefundETH: async (
    args: UniswapV3_Module_Args_encodeRefundETH,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "encodeRefundETH",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  encodeMulticall: async (
    args: UniswapV3_Module_Args_encodeMulticall,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "encodeMulticall",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  collectRewards: async (
    args: UniswapV3_Module_Args_collectRewards,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "collectRewards",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  withdrawToken: async (
    args: UniswapV3_Module_Args_withdrawToken,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "withdrawToken",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  encodeDeposit: async (
    args: UniswapV3_Module_Args_encodeDeposit,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "encodeDeposit",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  quoteCallParameters: async (
    args: UniswapV3_Module_Args_quoteCallParameters,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "quoteCallParameters",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  createCallParameters: async (
    args: UniswapV3_Module_Args_createCallParameters,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "createCallParameters",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  addCallParameters: async (
    args: UniswapV3_Module_Args_addCallParameters,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "addCallParameters",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  collectCallParameters: async (
    args: UniswapV3_Module_Args_collectCallParameters,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "collectCallParameters",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  removeCallParameters: async (
    args: UniswapV3_Module_Args_removeCallParameters,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "removeCallParameters",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  safeTransferFromParameters: async (
    args: UniswapV3_Module_Args_safeTransferFromParameters,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_MethodParameters>> => {
    return client.invoke<Types.UniswapV3_MethodParameters>({
      uri: Uri.from(uri),
      method: "safeTransferFromParameters",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  toHex: async (
    args: UniswapV3_Module_Args_toHex,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "toHex",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  computePoolAddress: async (
    args: UniswapV3_Module_Args_computePoolAddress,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "computePoolAddress",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  encodeSqrtRatioX96: async (
    args: UniswapV3_Module_Args_encodeSqrtRatioX96,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "encodeSqrtRatioX96",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  mulDivRoundingUp: async (
    args: UniswapV3_Module_Args_mulDivRoundingUp,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "mulDivRoundingUp",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  addDelta: async (
    args: UniswapV3_Module_Args_addDelta,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "addDelta",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  maxLiquidityForAmounts: async (
    args: UniswapV3_Module_Args_maxLiquidityForAmounts,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "maxLiquidityForAmounts",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  mostSignificantBit: async (
    args: UniswapV3_Module_Args_mostSignificantBit,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UInt32>> => {
    return client.invoke<Types.UInt32>({
      uri: Uri.from(uri),
      method: "mostSignificantBit",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  nearestUsableTick: async (
    args: UniswapV3_Module_Args_nearestUsableTick,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Int32>> => {
    return client.invoke<Types.Int32>({
      uri: Uri.from(uri),
      method: "nearestUsableTick",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tickToPrice: async (
    args: UniswapV3_Module_Args_tickToPrice,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Price>> => {
    return client.invoke<Types.UniswapV3_Price>({
      uri: Uri.from(uri),
      method: "tickToPrice",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  priceToClosestTick: async (
    args: UniswapV3_Module_Args_priceToClosestTick,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Int32>> => {
    return client.invoke<Types.Int32>({
      uri: Uri.from(uri),
      method: "priceToClosestTick",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getAmount0Delta: async (
    args: UniswapV3_Module_Args_getAmount0Delta,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "getAmount0Delta",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getAmount1Delta: async (
    args: UniswapV3_Module_Args_getAmount1Delta,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "getAmount1Delta",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getNextSqrtPriceFromInput: async (
    args: UniswapV3_Module_Args_getNextSqrtPriceFromInput,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "getNextSqrtPriceFromInput",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getNextSqrtPriceFromOutput: async (
    args: UniswapV3_Module_Args_getNextSqrtPriceFromOutput,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "getNextSqrtPriceFromOutput",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tickIsBelowSmallest: async (
    args: UniswapV3_Module_Args_tickIsBelowSmallest,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "tickIsBelowSmallest",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tickIsAtOrAboveLargest: async (
    args: UniswapV3_Module_Args_tickIsAtOrAboveLargest,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "tickIsAtOrAboveLargest",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  nextInitializedTick: async (
    args: UniswapV3_Module_Args_nextInitializedTick,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Tick>> => {
    return client.invoke<Types.UniswapV3_Tick>({
      uri: Uri.from(uri),
      method: "nextInitializedTick",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  tickListIsSorted: async (
    args: UniswapV3_Module_Args_tickListIsSorted,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: Uri.from(uri),
      method: "tickListIsSorted",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getSqrtRatioAtTick: async (
    args: UniswapV3_Module_Args_getSqrtRatioAtTick,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "getSqrtRatioAtTick",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getTickAtSqrtRatio: async (
    args: UniswapV3_Module_Args_getTickAtSqrtRatio,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Int32>> => {
    return client.invoke<Types.Int32>({
      uri: Uri.from(uri),
      method: "getTickAtSqrtRatio",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  fetchToken: async (
    args: UniswapV3_Module_Args_fetchToken,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Token>> => {
    return client.invoke<Types.UniswapV3_Token>({
      uri: Uri.from(uri),
      method: "fetchToken",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  fetchPoolFromTokens: async (
    args: UniswapV3_Module_Args_fetchPoolFromTokens,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Pool>> => {
    return client.invoke<Types.UniswapV3_Pool>({
      uri: Uri.from(uri),
      method: "fetchPoolFromTokens",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  fetchPoolFromAddress: async (
    args: UniswapV3_Module_Args_fetchPoolFromAddress,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UniswapV3_Pool>> => {
    return client.invoke<Types.UniswapV3_Pool>({
      uri: Uri.from(uri),
      method: "fetchPoolFromAddress",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  fetchTickList: async (
    args: UniswapV3_Module_Args_fetchTickList,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Array<Types.UniswapV3_Tick>>> => {
    return client.invoke<Array<Types.UniswapV3_Tick>>({
      uri: Uri.from(uri),
      method: "fetchTickList",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  feeAmountToTickSpacing: async (
    args: UniswapV3_Module_Args_feeAmountToTickSpacing,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Int32>> => {
    return client.invoke<Types.Int32>({
      uri: Uri.from(uri),
      method: "feeAmountToTickSpacing",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getFeeAmount: async (
    args: UniswapV3_Module_Args_getFeeAmount,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.UInt32>> => {
    return client.invoke<Types.UInt32>({
      uri: Uri.from(uri),
      method: "getFeeAmount",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  getPermitV: async (
    args: UniswapV3_Module_Args_getPermitV,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Int32>> => {
    return client.invoke<Types.Int32>({
      uri: Uri.from(uri),
      method: "getPermitV",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  FACTORY_ADDRESS: async (
    args: UniswapV3_Module_Args_FACTORY_ADDRESS,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "FACTORY_ADDRESS",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  POOL_INIT_CODE_HASH: async (
    args: UniswapV3_Module_Args_POOL_INIT_CODE_HASH,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.String>> => {
    return client.invoke<Types.String>({
      uri: Uri.from(uri),
      method: "POOL_INIT_CODE_HASH",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  MIN_TICK: async (
    args: UniswapV3_Module_Args_MIN_TICK,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Int32>> => {
    return client.invoke<Types.Int32>({
      uri: Uri.from(uri),
      method: "MIN_TICK",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  MAX_TICK: async (
    args: UniswapV3_Module_Args_MAX_TICK,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.Int32>> => {
    return client.invoke<Types.Int32>({
      uri: Uri.from(uri),
      method: "MAX_TICK",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  MIN_SQRT_RATIO: async (
    args: UniswapV3_Module_Args_MIN_SQRT_RATIO,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "MIN_SQRT_RATIO",
      args: (args as unknown) as Record<string, unknown>,
    });
  },

  MAX_SQRT_RATIO: async (
    args: UniswapV3_Module_Args_MAX_SQRT_RATIO,
    client: CoreClient,
    uri: string = "ens/uniswap.wraps.eth:v3@1.0.0"
  ): Promise<InvokeResult<Types.BigInt>> => {
    return client.invoke<Types.BigInt>({
      uri: Uri.from(uri),
      method: "MAX_SQRT_RATIO",
      args: (args as unknown) as Record<string, unknown>,
    });
  }
};

/// Imported Modules END ///
