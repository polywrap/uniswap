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
import {theme, displayHeadingProps, typography, colors} from "./styles/theme"

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
              <Heading
                margin="0px"
                color="secondary"
                fontSize="h1"
                fontWeight={800}
                textAlign="center"
                lineHeight={displayHeadingProps.lineHeight}
                letterSpacing={displayHeadingProps.letterSpacing}
                fontFamily={displayHeadingProps.fontFamily}
                marginBottom="16px"
              >
                UNISWAP V3 WRAPPER
              </Heading>
              <Heading
                margin="0px"
                color="primary"
                fontSize="h3"
                textAlign="center"
                lineHeight={displayHeadingProps.lineHeight}
                fontFamily={displayHeadingProps.fontFamily}
              >
                {uniswapV3Uri}
              </Heading>
              <Heading
                margin="0px"
                color="primary"
                fontSize="h3"
                textAlign="center"
                lineHeight={displayHeadingProps.lineHeight}
                fontFamily={displayHeadingProps.fontFamily}
              >
                https://github.com/polywrap/uniswap
              </Heading>
            </FlexBox>
          </Slide>
          <Slide>
            <Heading
              margin="0px"
              color="secondary"
              fontSize="h1"
              fontWeight={800}
              textAlign="center"
              lineHeight={displayHeadingProps.lineHeight}
              letterSpacing={displayHeadingProps.letterSpacing}
              fontFamily={displayHeadingProps.fontFamily}
              marginBottom="16px"
            >
              Sections
            </Heading>
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
