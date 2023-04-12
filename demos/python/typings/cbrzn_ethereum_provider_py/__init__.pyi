"""
This type stub file was generated by pyright.
"""

import json
from polywrap_core import Env, Invoker, UriPackageOrWrapper
from polywrap_plugin import PluginModule, PluginPackage
from eth_account.messages import encode_structured_data
from web3 import Web3
from web3.types import RPCEndpoint
from typing import Any, Dict, Optional, cast
from cbrzn_ethereum_provider_py.connections import Connections

class EthereumProviderPlugin(PluginModule[Connections]):
    def __init__(self, connections: Connections) -> None:
        ...
    
    def request(self, args: Dict[str, Any], client: Invoker[UriPackageOrWrapper], env: Optional[Env] = ...) -> str:
        ...
    
    def wait_for_transaction(self, args: Dict[str, Any], client: Invoker[UriPackageOrWrapper], env: Optional[Env] = ...) -> bool:
        ...
    
    def signer_address(self, args: Dict[str, Any], client: Invoker[UriPackageOrWrapper], env: Optional[Env] = ...) -> Optional[str]:
        ...
    


def ethereum_provider_plugin(connections: Connections) -> PluginPackage[Connections]:
    ...

