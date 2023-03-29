import { accountAbstractionUri, ethereumUri, gelatoRelayUri, relayUri, safeContractsUri, safeFactoryUri, safeManagerUri, uniswapV3Uri } from "./uris";


export const wrappers: Record<string, string> = {
  "uniswap-v3": uniswapV3Uri,
  "account-abstraction": accountAbstractionUri,
  "relay": relayUri,
  "gelato-relay": gelatoRelayUri,
  "safe-contracts": safeContractsUri,
  "safe-factory": safeFactoryUri,
  "safe-manager": safeManagerUri,
  "ethereum": ethereumUri,
};