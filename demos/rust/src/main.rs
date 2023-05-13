use std::{collections::HashMap, sync::Arc};

use dotenv::dotenv;
use http_plugin_rs::HttpPlugin;
use polywrap_client::{
    builder::types::{BuilderConfig, ClientBuilder, ClientConfigHandler},
    client::PolywrapClient,
    core::uri::Uri,
    msgpack::msgpack,
    plugin::package::PluginPackage,
};
use polywrap_core::{package::WrapPackage, wrapper::Wrapper};
use polywrap_ethereum_wallet_plugin::{
    connection::Connection, connections::Connections, EthereumWalletPlugin,
};
use types::Token;

use crate::types::Pool;

pub mod embeds;
pub mod types;

fn get_default_wraps() -> Vec<(Uri, Arc<dyn Wrapper>)> {
    let ethereum_wrap_core_uri: Uri = Uri::new("wrap://ens/ethers.wraps.eth");
    let ethereum_wrap_utils_uri: Uri = Uri::new("wrap://ens/ethers.wraps.eth:utils@0.0.1");

    let graph_node_wrapper_uri: Uri = Uri::new("wrap://ens/wraps.eth:graph-node@1.0.0");
    let sha3_wrapper_uri: Uri = Uri::new("wrap://ens/wraps.eth:sha3@1.0.0");

    let uniswap_wrapper_uri: Uri = Uri::new("wrap://wrap/uniswap-v3");

    let ethereum_wrap_core_package = Arc::new(embeds::ethers_core::wasm_wrapper());
    let ethereum_wrap_utils_package = Arc::new(embeds::ethers_utils::wasm_wrapper());
    let graph_node_wrap_package = Arc::new(embeds::graph_node::wasm_wrapper());
    let sha3_wrap_package = Arc::new(embeds::sha3::wasm_wrapper());
    let uniswap_v3_wrap_package = Arc::new(embeds::uniswap_v3::wasm_wrapper());

    vec![
        (ethereum_wrap_core_uri, ethereum_wrap_core_package),
        (ethereum_wrap_utils_uri, ethereum_wrap_utils_package),
        (graph_node_wrapper_uri, graph_node_wrap_package),
        (sha3_wrapper_uri, sha3_wrap_package),
        (uniswap_wrapper_uri, uniswap_v3_wrap_package),
    ]
}

fn get_default_packages() -> Vec<(Uri, Arc<dyn WrapPackage>)> {
    let private_key = if let Ok(p) = dotenv::var("PRIVATE_KEY") {
        p
    } else {
        panic!("Please set the environment variable PRIVATE_KEY")
    };

    let connection = Connection::new(
        "https://mainnet.infura.io/v3/1a8e6a8ab1df44ccb77d3e954082c5d4".to_string(),
        Some(private_key),
    )
    .unwrap();

    let connections = Connections::new(
        HashMap::from([("mainnet".to_string(), connection)]),
        Some("mainnet".to_string()),
    );

    let ethereum_provider_uri: Uri = Uri::new("wrap://ens/wraps.eth:ethereum-provider@2.0.0");

    let wallet_plugin = EthereumWalletPlugin::new(connections);
    let plugin_pkg: PluginPackage = wallet_plugin.into();
    let ethereum_wallet_package = Arc::new(plugin_pkg);

    let http = HttpPlugin {};
    let http_plugin_package: PluginPackage = http.into();
    let http_package = Arc::new(http_plugin_package);

    vec![
        (ethereum_provider_uri, ethereum_wallet_package),
        (Uri::try_from("plugin/http@1.1.0").unwrap(), http_package),
    ]
}

fn main() {
    println!("Demo of swap method in uniswap with rust client started...");
    dotenv().ok();
    let uniswap_wrapper_uri: Uri = Uri::new("wrap://wrap/uniswap-v3");
    let ethereum_provider_uri: Uri = Uri::new("wrap://ens/wraps.eth:ethereum-provider@2.0.0");

    let mut builder = BuilderConfig::new(None);
    builder.add_packages(get_default_packages());
    builder.add_wrappers(get_default_wraps());

    let config = builder.build();
    let client = PolywrapClient::new(config);

    let signer = client
        .invoke::<String>(&ethereum_provider_uri, "signerAddress", None, None, None)
        .unwrap();

    println!("{}", format!("The address: {signer} will execute the swap"));

    println!("Getting native token...");
    let native_token_invocation = client.invoke::<Token>(
        &uniswap_wrapper_uri,
        "getNative",
        Some(&msgpack!({
            "chainId": "MAINNET"
        })),
        None,
        None,
    );

    if native_token_invocation.is_err() {
        panic!(
            "Error in getNative method: {:#}",
            native_token_invocation.unwrap_err()
        )
    }

    let native_token = native_token_invocation.unwrap();

    println!("{}", format!("Native token is: {:?}", native_token));

    let usdc_eth_03_address = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

    println!("Fetching pool of USDC and ETH...");
    let get_pool_from_address_invocation = client.invoke::<Pool>(
        &uniswap_wrapper_uri,
        "fetchPoolFromAddress",
        Some(&msgpack!({
            "chainId": "MAINNET",
            "address": usdc_eth_03_address,
            "fetchTicks": true
        })),
        None,
        None,
    );

    if get_pool_from_address_invocation.is_err() {
        panic!(
            "Error in getNative method: {:#}",
            get_pool_from_address_invocation.unwrap_err()
        )
    }

    let pool_info = get_pool_from_address_invocation.unwrap();
    print!("{}", format!("Pool fetched with info: {:?}", pool_info));
}
