# The Uniswap v3 Wrapper

Reference documentation for the Uniswap v3 wrapper is located at https://docs.polywrap.io/uniswapv3/intro.

The Uniswap v3 wrapper is a Polywrap-compatible API providing the same features as Uniswap's JavaScript SDK, plus more. The wrapper is written in AssemblyScript and compiled to Web Assembly (WASM). Polywrap's JavaScript Client makes interfacing with the wrapper as easy as interfacing with any ordinary JavaScript SDK.

Polywrap wrappers are user-friendly, secure, scalable, and infinitely composable. They are designed to be seamlessly upgradeable and truly multi-platform. They are better SDK's.

While the first Polywrap Client is written in JavaScript, future clients will be written for languages like Rust, Python, and Kotlin. Once written, a wrapper can be used with any Polywrap Client.


## The Polywrap Toolchain

Polywrap's core toolchain consists of a development environment for writing API's and a Client to interface with them.

The Polywrap Client handles URI resolution and API method invocations. It downloads and caches the API at runtime, loads a Web Assembly runtime, makes the requested API call, and returns the result in the Client's native language. All of this happens "under the hood". Users have a familiar development experience so they can focus on their applications.

Polywrap wrappers are written in a supported language--currently AssemblyScript and Rust--and compiled to WASM. Wrappers can interact with each other seamlessly, irrespective of their source language. Wrapper calls are stateless and sandboxed for unprecedented security. And they are fast!

Polywrap plugins are written in a Client's native language to extend the Client's functionality. Wrappers can interact with plugins as though they were wrappers, and the plugin development experience is similar to that of wrappers. However, plugins do not have wrappers' special qualities. Because WASM modules are sandboxed, wrappers cannot directly interact with the browser, the filesystem, or networks. Plugins were conceived to handle these tasks securely.

Polywrap is a new paradigm. Integrating a WASM module into an application used to be a clunky and complex effort. Polywrap makes the WASM user experience *really good*.

## From SDK to Wrapper with Uniswap v3

"Yeah, Poywrap is cool, but what about our traditional SDK?"

If something like this crossed your mind, we've got you covered. Porting a JavaScript SDK to a wrapper is fairly straightforward. This section describes how we did it for Uniswap.

When writing the Uniswap v3 wrapper, our goal was to provide the same user experience as the SDK. The wrapper provides feature-parity and the "business logic" is the same. We ported elements of the Uniswap SDK Core package as necessary to implement the v3 wrapper.

### Project scaffolding

The best way to set up a Polywrap project is to start with one of the project templates available in the Polywrap CLI. The `polywrap create` command lets you bootstrap your project structure without effort.

The initial project setup includes a `src` folder, which correspond to the module a wrapper have.

It also includes a `polywrap.yaml` manifest file, and a `polywrap.build.yaml` build manifest file. The `polywrap.yaml` manifest tells the Polywrap CLI what language your wrapper is in, where your module schemas are located, and more. Our `polywrap.yaml` looked like this:

```yaml
format: 0.3.0
project:
  name: uniswap-v3
  type: wasm/assemblyscript
source:
  schema: ./src/schema.graphql
  module: ./src/index.ts
extensions:
  build: ./polywrap.build.yaml
```

The build manifest lets you customize the build process.

For the Uniswap v3 wrapper, we left the `polywrap.yaml` manifest and the build manifest unchanged.

### Writing the interface in a GraphQL Schema

We started by reading through the entire Uniswap v3 JavaScript SDK repo on GitHub to record all the types and methods we would reproduce, and to take note of their interactions. The interface of a Polywrap API is declared in a GraphQL schema. We wrote a schema type for each externally-facing class in the SDK, with properties that matched those in the class with public access. We wrote a method declaration in the schema for each externally-facing function and class method in the SDK. We even copied over the SDK's inline documentation to fill the schema with context.

```graphql
#An abridged look at our schema

"""ERC20-compliant token or Ether"""
type Token {
  """Id of chain where token exists"""
  chainId: ChainId!
  """Address of token's ERC20 contract"""
  address: String!
  """Token description"""
  currency: Currency!
}

type Module {
  """Returns true if the tokens are equivalent, false otherwise"""
  tokenEquals(
    tokenA: Token!
    tokenB: Token!
  ): Boolean!

  """Returns true if the address of tokenA would precede the address of token B when sorted alphabetically"""
  tokenSortsBefore(
    tokenA: Token!
    tokenB: Token!
  ): Boolean!
}
```

Every wrapper has a `Module` type which is where all the exposed functions are defined. You can think about is as the entry point for the wrapper. It is the only type that can be called directly from the Polywrap Client.

The first draft of the Uniswap v3 wrapper's schema was written in just a few hours, though it was revised during development to fix mistakes and improve the user experience.

### Implementing the first functions

When porting an SDK, it's important to understand its project structure. The organization of the SDK's soure code can indicate how wrapper development should proceed. Development should allow for iterative changes and testing.

The Unsiwap v3 SDK can be mentally modularized into a roughly linear set of dependent components. We can start with the concept of a `Token`, which is the component of a `CurrencyAmount` and a `Pool`. A `Route` is a set of pools and currencies.  A `Trade` is constructed from two currency amounts and one or more routes. Based on this pattern, it made sense for us to start with `Token`.

In Uniswap's JavaScript SDK, Token has properties like `chainId` and `address`, as well as two class methods: `equals` and `sortsBefore`.
```typescript
// Methods found in the Token class in Uniswap's SDK Core package

public equals(other: Currency): boolean {
  return other.isToken && this.chainId === other.chainId && this.address === other.address
}

public sortsBefore(other: Token): boolean {
  invariant(this.chainId === other.chainId, 'CHAIN_IDS')
  invariant(this.address !== other.address, 'ADDRESSES')
  return this.address.toLowerCase() < other.address.toLowerCase()
}
```

Using the Polywrap CLI's `codegen` command, we generated AssemblyScript classes corresponding to each type we defined in the schema. This was as simple as typing `polywrap codegen`. The classes work like TypeScript interfaces (statically typed JavaScript objects) that include some boilerplate serialization logic. When you declare a function in your schema that returns a custom type or accepts one as an argument, these generated classes are used as the AssemblyScript analogs.

The `codegen` command simulatenously generates another flavor of AssemblyScript class: function args. An `Args_*` class is generated for each function, where `*` is the name of the function. The classes have properties corresponding to the arguments defined in the schema. These `Args_*` classes are used as arguments to the functions declared in the GraphQL schema.

The Polywrap CLI places the generated files in directories named `polywrap`, which can be found within each module folder (as declared in your `polywrap.yaml` manifest). From there you can implement and use them.

Once we generated the classes, we imported the generated types and implemented the functions just as we found them in the Uniswap SDK. The function signatures match the schema definitions we declared earlier.


```typescript
// An abridged copy of src/token/index.ts in the Uniswap v3 wrapper

import {
  Args_tokenEquals,
  Args_tokenSortsBefore,
  Token,
} from "./wrap";

// Checks if the current instance is equal to another (has an identical chainId and address).
export function tokenEquals(args: Args_tokenEquals): boolean {
  const tokenA: Token = args.tokenA;
  const tokenB: Token = args.tokenB;
  return tokenA.chainId == tokenB.chainId && tokenA.address == tokenB.address;
}

// Checks if the current instance sorts before another, by address.
export function tokenSortsBefore(args: Args_tokenSortsBefore): boolean {
  const tokenA: Token = args.tokenA;
  const tokenB: Token = args.tokenB;
  const tokenAddress: string = tokenA.address.toLowerCase();
  const otherAddress: string = tokenB.address.toLowerCase();
  return tokenAddress.localeCompare(otherAddress) < 0;
}
```

After implementing the token functions, it was possible to build the project (after commenting out methods in the schema that had not yet been implemented) and write the first automated tests.

### Importing plugins and wrappers

The Uniswap v3 wrapper imports external dependencies to help it with certain tasks. A wrapper can import other wrappers or plugins.

One of the most important dependencies we used is Polywrap's Ethereum Wrapper. The Ethereum Wrapper providers the same functionality as the `ethers.js` library. It can be used to prepare and send Ethereum transactions in much the same way. It also depends on an `ethereum-provider` plugin which allows the wrapper to sign/send transactions.

Although the Uniswap v3 JavaScript SDK does not include methods that mutate state on the Ethereum blockchain, several of its functions do return encoded Ethereum transaction calldata that can be sent to Uniswap's on-chain smart contracts. The SDK uses `ethers.js` to encode calldata. We can do the same with the Ethereum Wrapper.

Our `src/schema.graphql` schema declares several imports at the top of the file. Among these is the Ethereum Wrapper, which is included in the Polywrap client by default.

```graphql
#import { Module, TxResponse } into Ethereum from "wrap://ens/wraps.eth:ethereum@2.0.0"
#import { Module } into SHA3 from "wrap://ens/wraps.eth:sha3@1.0.0"
#import { Module } into Subgraph from "wrap://ens/wraps.eth:graph-node@1.0.0"
```

Wrappers and plugins are invoked at URIs. When a user wants to call an API function with the Polywrap Client, they use a URI to tell the Client which API they are calling. The URI's are also used to import wrapper dependencies.

Once imports are declared, we can run the `codegen` command of the Polywrap CLI to generate imported modules and types. The imported module class includes all of the methods declared in its own GraphQL schema. If we want to know what's in it, we might look there first.

We used the Ethereum wrapper's `encodeFunction` method to encode calldata for Uniswap's Multicall smart contract.
```typescript
// An abridged copy of src/router/utils.ts in the Uniswap v3 wrapper

import {
  Ethereum_Module,
  Args_encodeMulticall,
} from "./wrap";

export function encodeMulticall(args: Args_encodeMulticall): string {
  const calldatas: string[] = args.calldatas;
  return calldatas.length == 1
    ? calldatas[0]
    : Ethereum_Module.encodeFunction({
        method:
          "function multicall(bytes[] calldata data) external payable returns (bytes[] memory results)",
        args: ['["' + calldatas.join('","') + '"]'],
      }).unwrap();
}
```

### How to add network support

In the common case, adding support for a new chain is easy.
You will need the address of the chain's WETH contract.
1. Add network to ChainId enum in `src/schema.graphql`
2. Update `_getWeth` in `src/token/utils.ts`
3. If chain has its own native token, update `_getNative`, `_isNative`, and `_wrapToken` in `src/token/utils.ts`
4. Update tests in `src/__tests__/unit/utils/tokenUtils.spec.ts`

### Using base schema types

Polywrap schemas support additional default types beyond those found in standard GraphQL. The `BigInt` type is used in the Uniswap v3 wrapper to represent integers larger than 32 bits. Since Ethereum supports unsigned integers as large as 256 bits, we needed to support them as well.

```graphql
"""An amount of a token"""
type TokenAmount {
  """Token"""
  token: Token!
  """Raw amount of the token, not adjusted for the token's decimals"""
  amount: BigInt!
}
```

The `BigInt` type looks like a standard GraphQL type in the schema. In AssemblyScript, the type is received as an instance of the `BigInt` class from in the [as-bigint](https://github.com/polywrap/as-bigint) AssemblyScript package.

```typescript
// compares two TokenAmount types for equality, returning true if they have the
// same token and same amount
export function tokenAmountEquals(args: Args_tokenAmountEquals): boolean {
  const amtA: TokenAmount = args.tokenAmountA;
  const amtB: TokenAmount = args.tokenAmountB;
  return (
    tokenEquals({ tokenA: amtA.token, tokenB: amtB.token }) &&
    amtA.amount.eq(amtB.amount)
  );
}
```

Other base schema types include `BigNumber`, `JSON`, and `Map<T,U>`. These types, along with `BigInt`, can be imported directly into AssemblyScript modules from the `polywrap/wasm` package.

### Testing

We adapted all of the tests in Uniswap's SDK to work with the wrapper. This ensured that the wrapper met at least the same standards of quality the Uniswap team expected of their SDK. The Uniswap team tested their SDK with artificial data that allowed them to calculate the expected results and compare those results to the outputs of their code. We used the same test cases and expected the same results from our wrapper.

We also wrote tests based on real-world data, using a fork of the Ethereum Mainnet network, to compare the results of our wrapper queries with results produced by the SDK. This helped us test the wrapper with input of greater complexity.

We wrote automated tests using two different testing frameworks: `as-pect` and `jest`.

#### AssemblyScript tests with as-pect

`as-pect` is an AssemblyScript testing framework, and that is why we used it. Unit tests written in the native language of the wrapper can be used to test classes and functions that are written to support the main wrapper code. This reduces the layers of complexity that would be associated with testing only the functions declared in our GraphQL schema.

For example, we wrote a `PriorityQueue` class to sort trades for the `bestTradeExactIn` and `bestTradeExactOut` functions. We used `as-pect` to test it. This simplified testing and debugging for`bestTradeExactIn` and `bestTradeExactOut`.

We wrote many of our other tests in `as-pect` as well, in part because it was straightforward to copy and paste test scripts from the Uniswap v3 SDK repo and adapt the syntax.

One quirk with `as-pect` is that the following must be added to its configuration file to get it working with Polywrap.

```json
imports: {
  wrap: {
    __wrap_invoke_args: () => {},
    __wrap_invoke_result: () => {},
    __wrap_invoke_error: () => {},
    __wrap_subinvoke: () => {},
    __wrap_subinvoke_result: () => {},
    __wrap_subinvoke_result_len: () => {},
    __wrap_subinvoke_error: () => {},
    __wrap_subinvoke_error_len: () => {},
    __wrap_abort: () => {},
  }
},
```

#### End-to-end tests in JavaScript with Jest

Not all tests can be written in the wrapper's native language, nor should they be. Code that depends on other wrappers or plugins must be tested by making calls to the Polywrap Client. The Client coordinates inter-API communication.

We wrote many of our most important tests in the popular JavaScript framework `jest`. Were we to write the Uniswap v3 wrapper again, we would actually use a lot less `as-pect` and a lot more `jest`.

One advantage of testing with `jest` is that it requires developers to make calls in the same way users of their wrappers are likely to make them. A disadvantage is that it requires developers to set up the Polywrap client and a test environment, which is easy but takes more time.

#### Setting up a Polywrap test environment in JavaScript

Setting up the Client is easy if you only need the default plugins and plan to use a standard Polywrap test environment.

The `@polywrap/cli-js` package includes functions for starting and stopping a Polywrap test environment programmatically. The test environment has the following:
* A standard Ganache Ethereum test chain at "http://localhost:8545"
* A Ganache Ethereum mainnet fork test chain at "http://localhost:8546"
* An IPFS node at * A Ganache Ethereum test chain at "http://localhost:5001"

It also sets up an ENS contract at initialization so you can build wrappers and deploy them to an ENS URI on your locally hosted testnet.

We created a helper function that takes some network information as inputs and returns a Client config.

```typescript
export function getMainnetForkConfig(): IClientConfigBuilder {
  return new ClientConfigBuilder()
    .addDefaults()
    .addPackage(
      "ens/wraps.eth:ethereum-provider@2.0.0",
      ethereumProviderPlugin({
        connections: new Connections({
          networks: {
            mainnet: new Connection({ provider: "http://localhost:8546" }), // mainnet fork
          },
          defaultNetwork: "mainnet",
        }),
      }),
    );
}
```

And then we put some boilerplate code in each of our `jest` test files to start the test environment, intantiate the client, build the wrapper and access to it through File System URI

```typescript
import { PolywrapClient } from "@polywrap/client-js";
import { getMainnetForkConfig, initInfra, stopInfra } from "../helpers";

describe('Wrapper Test', () => {

  let client: PolywrapClient;
  let fsUri: string;
  let ethersProvider: ethers.providers.JsonRpcProvider;

  beforeAll(async () => {
    await initInfra();
    // get client
    const config = getMainnetForkConfig().build();
    client = new PolywrapClient(config);
    // get uri
    const wrapperAbsPath: string = path.resolve(__dirname + "/../../../../");
    fsUri = "fs/" + wrapperAbsPath + '/build';
    // set up ethers provider
    ethersProvider = new ethers.providers.JsonRpcProvider("http://localhost:8546");
  });

  afterAll(async () => {
    await stopInfra();
  });

  ...

})
```

#### Other tips for testing in JavaScript

The Polywrap CLI can automatically generate TypeScript types using the `polywrap codegen` command. The types mirror those declared in your GraphQL schema. The main difference with this, is that in the `project.type` attribute inside of `polywrap.yaml` needs to be defined as `app/typescript` instead of `wasm/assemblyscript`

If you love brevity, we can also recommend writing functions that "wrap" your wrapper calls. This can make your tests a bit easier to read.

```typescript
// This function lets us call the createRoute function in the Uniswap v3 wrapper with one line of code
export async function createRoute(client: Web3ApiClient, ensUri: string, pools: Pool[], inToken: Token, outToken: Token): Promise<Route> {
  const result = await client.invoke<Route>({
    uri: ensUri,
    method: "createRoute",
    args: {
      pools,
      inToken,
      outToken,
    },
  });
  if (!result.ok) {
    throw result.error;
  }
  return result.value;
}

// example usage
const route_0_1: Route = await createRoute(client, ensUri, [pool_0_1], token0, token1);
```
### Documentation

As a final touch, we generated ample documentation for the Uniswap v3 wrapper.

Polywrap's GraphQL parser can read documentation comments (comments with triple quotes) from the wrapper's GraphQL schema. Using this capability, Polywrap built a tool to help developers create documentation for their wrappers. Based on this, a documentation for the wrapper has been created: https://uniswap.docs.wrappers.io/
