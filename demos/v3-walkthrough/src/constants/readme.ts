export const readme = `
# The **Safe{Core} SDK** Wraps

The Safe{{Core}} SDK Wraps are a port of the [Safe{Core} SDK](https://safe.global/core) as a collection of Polywrap Wraps.

They consist of the main [Account Abstraction Wrapper](/#/account-abstraction), and a series of supporting Wraps:

- [Relayer](/#/relay)
- [Gelato Relay](/#/gelato-relay)
- [Safe Contracts](/#/safe-contracts)
- [Safe Factory](/#/safe-factory)
- [Safe Manager](/#/safe-manager)
- [Ethereum](/#/ethereum)

[Polywrap](https://polywrap.io) is a framework for building portable web3 SDKs, also referred to as "Wraps". Wraps are easy to integrate and compose together, making web3 software development a breeze.

## Examples

Make sure to check out the [Execute Sponsored Transaction Example](/#/account-abstraction/example/Execute%20Sponsored%20Transaction) for a live demo of its functionality!

## Schema

All Wraps have a schema which describes their capabilities. You can find the Account Abstraction schema [here](/#/account-abstraction/schema).

## Source Code

- [Account Abstraction and Relay Wraps Github](https://github.com/cbrzn/account-abstraction-wrapper)
- [Gelato Relay Wrap Github](https://github.com/cbrzn/gelato-relay-polywrap)
- [Safe Contracts, Factory, and Manager Wraps Github](https://github.com/polywrap/safe-contracts-wrapper)
- [Ethereum Wrap Github](https://github.com/polywrap/ethereum)

## Integrate

### Step 1: Polywrap Client

In order to integrate the UniV3 wrap into your applications, the first thing you'll need is a Polywrap client. Currently Polywrap has clients available in:
- JavaScript / TypeScript
- Python
- Rust
- Go
- Swift

### Step 2: Client Config 

The Account Abstraction Wrap depends upon the [ethereum wrap](https://github.com/polywrap/ethereum), which in-turn requires an [ethereum-provider plugin](https://github.com/polywrap/ethereum/tree/main/provider). Plugins are added directly to the client using its config.

[Here's an example](https://github.com/polywrap/ethereum/blob/36e6f3331264732e73f3e236004416e82930ed64/provider/implementations/js/tests/index.spec.ts#L15-L30) of setting up a JavaScript / TypeScript client with the ethereum-provider plugin.

You can learn more about Polywrap clients & configs in the docs [here](https://docs.polywrap.io/tutorials/integrate-wrappers/configure-client).

### Step 3: Run!

With your client successfully configured, you can now run any function on the UniV3 wrap with ease.

You can execute functions in TypeScript with the \`client.invoke(...)\` syntax like so:
\`\`\`typescript
await client.invoke({
  uri: "wrap://ens/aa.safe.wraps.eth:core@0.1.0",
  method: "relayTransaction",
  args: {...}
});
\`\`\`

Or you can keep it type-safe by using Polywrap's codegen like so:
\`\`\`typescript
await AccountAbstraction.relayTransaction({...});
\`\`\`

## Support

For any questions or problems related to the Account Abstraction Wrap or Polywrap at large, please visit our [Discord](https://discord.polywrap.io).

`;
