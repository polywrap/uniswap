import os
from pathlib import Path
from eth_account import Account
import time

from polywrap_uri_resolvers import (
    RecursiveResolver,
    UriResolverAggregator,
    StaticResolver,
    FsUriResolver,
    SimpleFileReader,
)
from polywrap_client import PolywrapClient, ClientConfig
from polywrap_core import InvokerOptions, UriPackageOrWrapper, Uri
from polywrap_http_plugin import http_plugin
from polywrap_ethereum_provider import ethereum_provider_plugin
from polywrap_ethereum_provider.connection import Connection
from polywrap_ethereum_provider.connections import Connections

from dotenv import load_dotenv

load_dotenv()

ETHEREUM_WRAP_CORE_URI = Uri.from_str("wrap://ens/ethers.wraps.eth")
ETHEREUM_WRAP_UTILS_URI = Uri.from_str("wrap://ens/ethers.wraps.eth:utils@0.0.1")
ETHEREUM_PROVIDER_URI = Uri.from_str("wrap://ens/wraps.eth:ethereum-provider@2.0.0")
GRAPH_NODE_WRAPPER_URI = Uri.from_str("wrap://ens/wraps.eth:graph-node@1.0.0")
HTTP_PLUGIN_URI = Uri.from_str("wrap://ens/wraps.eth:http@1.1.0")
SHA3_WRAPPER_URI = Uri.from_str("wrap://ens/wraps.eth:sha3@1.0.0")


LOCAL_ETHEREUM_CORE_WRAPPER = Uri.from_str("wrap://fs/./dependencies/ethers/core")
LOCAL_ETHEREUM_UTILS_WRAPPER = Uri.from_str("wrap://fs/./dependencies/ethers/utils")
LOCAL_GRAPH_NODE_WRAPPER = Uri.from_str("wrap://fs/./dependencies/graph-node")
LOCAL_SHA3_WRAPPER = Uri.from_str("wrap://fs/./dependencies/sha3")

uniswap_wrapper_path = Path(__file__).parent.parent.parent.joinpath(
    "v3", "wrap", "build"
)
UNISWAP_WRAPPER_URI = Uri.from_str(f"fs/{uniswap_wrapper_path}")


async def main():
    if "PRIVATE_KEY" not in os.environ:
        raise RuntimeError("Please set the environment variable PRIVATE_KEY")

    signer = Account.from_key(os.environ["PRIVATE_KEY"])
    print("Demo of swap in uniswap with python client started...")
    print(f"The address: {signer.address} will execute the swap")

    connection = Connection(provider="https://mainnet.infura.io/v3/1a8e6a8ab1df44ccb77d3e954082c5d4", signer=signer)
    connections = Connections(
        {"mainnet": connection}, default_network="mainnet"
    )
    ethereum_provider_package = ethereum_provider_plugin(connections=connections)
    http_plugin_package = http_plugin() # type: ignore
    resolver = RecursiveResolver(
        UriResolverAggregator(
            [
                FsUriResolver(file_reader=SimpleFileReader()),
                StaticResolver({ETHEREUM_WRAP_CORE_URI: LOCAL_ETHEREUM_CORE_WRAPPER}),
                StaticResolver({ETHEREUM_WRAP_UTILS_URI: LOCAL_ETHEREUM_UTILS_WRAPPER}),
                StaticResolver({ETHEREUM_PROVIDER_URI: ethereum_provider_package}),
                StaticResolver({GRAPH_NODE_WRAPPER_URI: LOCAL_GRAPH_NODE_WRAPPER}),
                StaticResolver({SHA3_WRAPPER_URI: LOCAL_SHA3_WRAPPER}),
                StaticResolver({HTTP_PLUGIN_URI: http_plugin_package}),
            ]
        )
    )

    config = ClientConfig(resolver=resolver)
    client = PolywrapClient(config=config)

    get_native_options: InvokerOptions[UriPackageOrWrapper] = InvokerOptions(
        uri=UNISWAP_WRAPPER_URI,
        method="getNative",
        args={"chainId": "MAINNET"},
        encode_result=False,
    )
    print("Getting native token...")
    native_token = await client.invoke(options=get_native_options)
    print(f"Native token is: {native_token}")
    USDC_ETH_03_ADDRESS = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"

    get_pool_from_address_options: InvokerOptions[UriPackageOrWrapper] = InvokerOptions(
        uri=UNISWAP_WRAPPER_URI,
        method="fetchPoolFromAddress",
        args={"chainId": "MAINNET", "address": USDC_ETH_03_ADDRESS, "fetchTicks": True},
    )

    print("Fetching pool of USDC and ETH...")
    pool_info = await client.invoke(options=get_pool_from_address_options)
    print(f"Pool fetched with info: {pool_info}")
    usdc = pool_info.get("token0")

    best_trade_exact_out_args = {
        "pools": [pool_info],
        "tokenIn": native_token,
        "amountOut": {"token": usdc, "amount": "1000000"},
        "options": None,
    }

    best_trade_exact_out_options: InvokerOptions[UriPackageOrWrapper] = InvokerOptions(
        uri=UNISWAP_WRAPPER_URI,
        method="bestTradeExactOut",
        args=best_trade_exact_out_args,
        encode_result=False,
    )
    print("Fetching best trade with the amount out of 1 USDC...")
    best_trade_exact_out = await client.invoke(options=best_trade_exact_out_options)
    print("Best trade fetched...")
    eth_usdc_trade = best_trade_exact_out[0]
    timestamp = int(time.time() + 1800)

    exec_swap_args = {
        "trades": [eth_usdc_trade],
        "swapOptions": {
            "slippageTolerance": "0.1",
            "recipient": signer.address,
            "timestamp": timestamp,
        },
    }

    exec_swap_options: InvokerOptions[UriPackageOrWrapper] = InvokerOptions(
        uri=UNISWAP_WRAPPER_URI,
        method="execSwap",
        args=exec_swap_args,
        encode_result=False,
    )

    print(("Execute swap..."))
    exec_swap = await client.invoke(options=exec_swap_options)
    print("Swap executed with result: ")
    print(exec_swap)


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
