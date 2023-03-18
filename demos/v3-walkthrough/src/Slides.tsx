import React from 'react';
import {
  Deck,
  Slide,
  FlexBox,
  Box,
  FullScreen,
  AnimatedProgress,
  Heading,
  ListItem,
  UnorderedList,
} from "spectacle";
import { PolywrapClient } from "@polywrap/client-js";

import ExampleSlide from "./components/ExampleSlide";
import { uniswapV3Uri, examples } from "./constants";
import { theme } from "./styles/theme"

const client = new PolywrapClient();

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
                {uniswapV3Uri}
              </Heading>
              <Heading margin="0px" color="primary" fontSize="h3">
                https://github.com/polywrap/uniswap
              </Heading>
            </FlexBox>
          </Slide>
          <Slide>
            <Heading>Sections</Heading>
            <UnorderedList>
              {examples.map((e) => (
                <ListItem>{e.name}</ListItem>
              ))}
            </UnorderedList>
          </Slide>
          {examples.map((e) => (
            <ExampleSlide example={e} client={client} />
          ))}
        </Deck>
      </header>
    </div>
  );
}

export default Slides;
