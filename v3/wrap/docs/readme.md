# The UniV3 Wrap

[Uniswap V3](https://docs.uniswap.org/concepts/uniswap-protocol) is a peer-to-peer system designed for exchanging cryptocurrencies on the Ethereum blockchain. It has become one of the most used & trusted decentralized exchanges on the blockchain ([usage statistics](https://defillama.com/protocol/uniswap)).

The UniV3 wrap gives you the ability to interact with Uniswap V3 contracts.

## Requirements

To run the UniV3 wrap you'll need a Polywrap client in your application. See here for installation information: https://docs.polywrap.io/clients

### Configuration

UniV3 depends upon the [ethereum wrap](https://github.com/polywrap/ethers), which in-turn requires an [ethereum-provider plugin](https://github.com/polywrap/ethereum-wallet). Plugins are added directly to the client using its config.

[Here's an example](https://github.com/polywrap/ethers/blob/36e6f3331264732e73f3e236004416e82930ed64/provider/implementations/js/tests/index.spec.ts#L15-L30) of setting up a JavaScript / TypeScript client with the ethereum-provider plugin.

You can learn more about Polywrap clients & configs in the docs [here](https://docs.polywrap.io/tutorials/use-wraps/configure-client).

## Run!

With your client successfully configured, you can now run any function on the UniV3 wrap with ease.

You can check out the UniV3 wrap's schema for a list of methods, or [check out its tests](https://github.com/polywrap/uniswap/tree/main/v3/wrap/src/__tests__/e2e) for detailed usage examples.

## Support

For any questions or problems related to the UniV3 wrap or Polywrap at large, please visit our [Discord](https://discord.polywrap.io).
