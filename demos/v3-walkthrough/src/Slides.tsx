import {
  Deck,
  Slide,
  FlexBox,
  Notes,
  Box,
  FullScreen,
  AnimatedProgress,
  SpectacleLogo,
  Heading,
  Text,
  OrderedList,
  ListItem,
  UnorderedList
} from "spectacle";
import { PolywrapClient } from "@polywrap/client-js";
import React from 'react';

const client = new PolywrapClient();

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: 'monospace, Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  }
};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <AnimatedProgress />
    </Box>
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

function Slides() {
  return (
    <div className="App">
      <header className="App-header">
        <Deck theme={theme} template={template}>
          <Slide>
            <FlexBox height="100%" flexDirection="column">
              <Heading margin="0px" fontSize="h1">
                Uniswap V3 Wrapper
              </Heading>
              <Heading margin="0px" color="primary" fontSize="h3">
                wrap://ens/uniswap.wraps.eth:v3
              </Heading>
              <Heading margin="0px" color="primary" fontSize="h3">
                https://github.com/polywrap/uniswap
              </Heading>
            </FlexBox>
          </Slide>
          <Slide>
            <Heading>Sections</Heading>
            <UnorderedList>
              <ListItem>Get Pool Addresses</ListItem>
            </UnorderedList>
          </Slide>
          <Slide>
            <Heading>Get Pool Addresses</Heading>
            TODO: select token in, token out
            TODO: generate code
            TODO: button to click and get the address using the wrapper
            <button onClick={async () => {
              console.log(await client.invoke({
                uri: "ens/uniswap.wraps.eth:v3",
                method: "getPoolAddress",
                args: {
                  tokenA: {
                    chainId: "MAINNET",
                    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    currency: {
                      decimals: 18,
                      symbol: "WETH",
                      name: "Wrapped Ether"
                    }
                  },
                  tokenB: {
                    chainId: "MAINNET",
                    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    currency: {
                      decimals: 6,
                      symbol: "USDC",
                      name: "USDC"
                    }
                  },
                  fee: "MEDIUM"
                }
              }));
            }}>Run Code</button>
          </Slide>
        </Deck>
      </header>
    </div>
  );
}

export default Slides;
