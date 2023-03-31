export const readme = `
# The UniV3 Wrap

[Uniswap V3](https://docs.uniswap.org/concepts/uniswap-protocol) is a peer-to-peer system designed for exchanging cryptocurrencies on the Ethereum blockchain. It has become one of the most used & trusted decentralized exchanges on the blockchain ([usage statistics](https://defillama.com/protocol/uniswap)).

[Polywrap](https://polywrap.io) is a framework for building portable web3 SDKs, also referred to as "wraps". Wraps are easy to integrate and compose together, making web3 software development a breeze.

## Examples

On this site, you'll be able to try the UniV3 wrap in the examples section. For example, try getting a pool address based on 2 input tokens [here](https://uniswap.docs.wrappers.io/#/example/Get%20Pool%20Address).

## Schema

All wraps have a schema which describes their capabilities. You can find the UniV3 schema [here](https://uniswap.docs.wrappers.io/#/schema).

## Source Code

The UniV3 source code can be found [here](https://github.com/polywrap/uniswap).

## Integrate

### Step 1: Polywrap Client

In order to integrate the UniV3 wrap into your applications, the first thing you'll need is a Polywrap client. Currently Polywrap has clients available in:
- JavaScript / TypeScript
- Python
- Rust
- Go
- Swift

### Step 2: Client Config 

UniV3 depends upon the [ethereum wrap](https://github.com/polywrap/ethereum), which in-turn requires an [ethereum-provider plugin](https://github.com/polywrap/ethereum/tree/main/provider). Plugins are added directly to the client using its config.

[Here's an example](https://github.com/polywrap/ethereum/blob/36e6f3331264732e73f3e236004416e82930ed64/provider/implementations/js/tests/index.spec.ts#L15-L30) of setting up a JavaScript / TypeScript client with the ethereum-provider plugin.

You can learn more about Polywrap clients & configs in the docs [here](https://docs.polywrap.io/tutorials/integrate-wrappers/configure-client).

### Step 3: Run!

With your client successfully configured, you can now run any function on the UniV3 wrap with ease.

You can execute functions in TypeScript with the \`client.invoke(...)\` syntax like so:
\`\`\`typescript
await client.invoke({
  uri: "wrap://ens/uniswap.wraps.eth:v3",
  method: "fetchPoolFromTokens",
  args: {...}
});
\`\`\`

Or you can keep it type-safe by using Polywrap's codegen like so:
\`\`\`typescript
await Uniswap.fetchPoolFromTokens({...});
\`\`\`

If you'd like to generate typings for the UniV3 wrap, you can see an example of this in TypeScript [here](https://github.com/polywrap/uniswap/tree/main/v3/sdks/js).

## Support

For any questions or problems related to the UniV3 wrap or Polywrap at large, please visit our [Discord](https://discord.polywrap.io).

`;
