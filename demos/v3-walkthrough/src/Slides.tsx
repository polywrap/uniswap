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
import {theme, displayHeadingProps, fontFamilies, letterSpacing} from "./styles/theme"
import styled from "styled-components";

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

const StyledHeading = styled(Heading)`
  font-weight: 800;
  text-align: center;
  line-height: ${displayHeadingProps.lineHeight};
  letter-spacing: ${letterSpacing.UppercaseDisplay};
  font-family: ${displayHeadingProps.fontFamily};
  font-stretch: expanded;
`

const StyledSubHeading = styled(Heading)`
  margin: 0;
  text-align: center;
  line-height: ${displayHeadingProps.lineHeight};
  letter-spacing: ${letterSpacing.PrimaryText};
  font-family: ${fontFamilies.sans};
`

function Slides() {
  return (
    <div className="App">
      <header className="App-header">
        <Deck theme={theme} template={template}>
          <Slide>
            <FlexBox height="100%" flexDirection="column">
              <StyledHeading color="secondary" fontSize="h1" margin={"-32px"}>
                UNISWAP V3
              </StyledHeading>
              <StyledHeading color="secondary" fontSize="h1" marginBottom={"32px"}>
                WRAPPER
              </StyledHeading>
              <StyledSubHeading color="primary" fontSize="h3">
                {uniswapV3Uri}
              </StyledSubHeading>
              <StyledSubHeading color="primary" fontSize="h3">
                https://github.com/polywrap/uniswap
              </StyledSubHeading>
            </FlexBox>
          </Slide>
          <Slide>
            <StyledHeading color="secondary" fontSize="h1">
              Sections
            </StyledHeading>
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
