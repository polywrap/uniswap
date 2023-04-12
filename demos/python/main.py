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
from eth_account import Account

# TODO: Change this w/polywrap name
from cbrzn_ethereum_provider_py import ethereum_provider_plugin
from cbrzn_ethereum_provider_py.connection import ConnectionConfig, Connection
from cbrzn_ethereum_provider_py.connections import Connections

# from polywrap_http_plugin import http_plugin


ETHEREUM_WRAPPER_URI = Uri.from_str("wrap://ens/wraps.eth:ethereum@2.0.0")
ETHEREUM_PROVIDER_URI = Uri.from_str("wrap://ens/wraps.eth:ethereum-provider@2.0.0")
UNISWAP_WRAPPER_URI = Uri.from_str("wrap://fs/../../v3/wrap/build")


async def main():
    if "PRIVATE_KEY" not in os.environ:
        raise RuntimeError("Please set the environment variable PRIVATE_KEY")

    signer = Account.from_key(os.environ["PRIVATE_KEY"])
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
                StaticResolver(
                    {
                        ETHEREUM_WRAPPER_URI: Uri.from_str(
                            "http/https://raw.githubusercontent.com/cbrzn/safe-playground/master/wrap-build-artifacts/ethereum/core"
                        )
                    }
                ),
                # StaticResolver({Uri.from_str("wrap://ens/wraps.eth:http@1.1.0"): http_plugin()}),
                StaticResolver({ETHEREUM_PROVIDER_URI: ethereum_provider}),
                FsUriResolver(file_reader=SimpleFileReader()),
            ]
        )
    )

    interface_implementations = {ETHEREUM_WRAPPER_URI: [ETHEREUM_PROVIDER_URI]}

    config = ClientConfig(resolver=resolver, interfaces=interface_implementations)
    client = PolywrapClient(config=config)

    get_pool_address_args = {
        "tokenA": {
            "chainId": "MAINNET",
            "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "currency": {"decimals": 18, "symbol": "WETH", "name": "Wrapped Ether"},
        },
        "tokenB": {
            "chainId": "MAINNET",
            "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "currency": {"decimals": 6, "symbol": "USDC", "name": "USDC"},
        },
        "fee": "MEDIUM",
    }

    options: InvokerOptions[UriPackageOrWrapper] = InvokerOptions(
        uri=UNISWAP_WRAPPER_URI,
        method="getPoolAddress",
        args=get_pool_address_args,
        encode_result=False,
    )
    result = await client.invoke(options=options)
    print(result)


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
