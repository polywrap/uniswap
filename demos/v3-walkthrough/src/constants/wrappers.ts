import { accountAbstractionUri, gelatoRelayUri, relayUri, uniswapV3Uri } from "./uris";


export const wrappers: Record<string, string> = {
  "uniswap-v3": uniswapV3Uri,
  "account-abstraction": accountAbstractionUri,
  "relay": relayUri,
  "gelato-relay": gelatoRelayUri,
};