from polywrap_uri_resolvers import (
    RecursiveResolver,
    UriResolverAggregator,
    StaticResolver,
    FsUriResolver,
    SimpleFileReader,
)
from polywrap_client import PolywrapClient, ClientConfig
from polywrap_core import InvokerOptions, UriPackageOrWrapper, Uri
import os
from pathlib import Path
from eth_account import Account
import time

# TODO: Change this w/polywrap name
from cbrzn_ethereum_provider_py import ethereum_provider_plugin
from cbrzn_ethereum_provider_py.connection import ConnectionConfig, Connection
from cbrzn_ethereum_provider_py.connections import Connections

from dotenv import load_dotenv

load_dotenv()

ETHEREUM_WRAPPER_URI = Uri.from_str("wrap://ens/wraps.eth:ethereum@2.0.0")
ETHEREUM_PROVIDER_URI = Uri.from_str("wrap://ens/wraps.eth:ethereum-provider@2.0.0")
GRAPH_NODE_WRAPPER_URI = Uri.from_str("wrap://ens/wraps.eth:graph-node@1.0.0")
SHA3_WRAPPER_URI = Uri.from_str("wrap://ens/wraps.eth:sha3@1.0.0")

LOCAL_ETHEREUM_WRAPPER = Uri.from_str("wrap://fs/./dependencies/ethereum")
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

    connection_config = ConnectionConfig(
        provider="https://mainnet.infura.io/v3/1a8e6a8ab1df44ccb77d3e954082c5d4",
        signer=signer,
    )
    connection = Connection(config=connection_config)
    connections = Connections(
        networks={"mainnet": connection}, default_network="mainnet"
    )
    ethereum_provider = ethereum_provider_plugin(connections=connections)

    resolver = RecursiveResolver(
        UriResolverAggregator(
            [
                FsUriResolver(file_reader=SimpleFileReader()),
                StaticResolver({ETHEREUM_WRAPPER_URI: LOCAL_ETHEREUM_WRAPPER}),
                StaticResolver({ETHEREUM_PROVIDER_URI: ethereum_provider}),
                StaticResolver({GRAPH_NODE_WRAPPER_URI: LOCAL_GRAPH_NODE_WRAPPER}),
                StaticResolver({SHA3_WRAPPER_URI: LOCAL_SHA3_WRAPPER}),
            ]
        )
    )

    interface_implementations = {ETHEREUM_PROVIDER_URI: [ETHEREUM_PROVIDER_URI]}

    config = ClientConfig(resolver=resolver, interfaces=interface_implementations)
    client = PolywrapClient(config=config)

    get_native_options: InvokerOptions[UriPackageOrWrapper] = InvokerOptions(
        uri=UNISWAP_WRAPPER_URI,
        method="getNative",
        args={"chainId": "mainnet"},
        encode_result=False,
    )
    print("Getting native token...")
    native_token = await client.invoke(options=get_native_options)
    print(f"Native token is: {native_token}")
    USDC_ETH_03_ADDRESS = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"

    get_pool_from_address_options: InvokerOptions[UriPackageOrWrapper] = InvokerOptions(
        uri=UNISWAP_WRAPPER_URI,
        method="fetchPoolFromAddress",
        args={"chainId": "mainnet", "address": USDC_ETH_03_ADDRESS, "fetchTicks": True},
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
