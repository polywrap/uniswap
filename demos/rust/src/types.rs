use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Token {
    pub chain_id: Option<ChainId>,
    pub address: String,
    pub currency: Currency,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Currency {
    pub decimals: u8,
    pub symbol: String,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ChainId {
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

#[derive(Debug, Serialize, Deserialize)]
pub enum FeeAmount {
    LOWEST,
    LOW,
    HIGH,
    MEDIUM,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Tick {
    pub index: i32,
    #[serde(rename = "liquidityGross")]
    pub liquidity_gross: String,
    #[serde(rename = "liquidityNet")]
    pub liquidity_net: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Price {
    #[serde(rename = "baseToken")]
    pub base_token: Token,
    #[serde(rename = "quoteToken")]
    pub quote_token: Token,
    pub denominator: String,
    pub numerator: String,
    pub price: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Pool {
    pub token0: Token,
    pub token1: Token,
    pub fee: FeeAmount,
    #[serde(rename = "sqrtRatioX96")]
    pub sqrt_ratio_x_96: String,
    pub liquidity: String,
    #[serde(rename = "tickCurrent")]
    pub tick_current: i32,
    #[serde(rename = "tickDataProvider")]
    pub tick_data_provider: Vec<Tick>,
    #[serde(rename = "token0Price")]
    pub token0_price: Price,
    #[serde(rename = "token1Price")]
    pub token1_price: Price,
}
