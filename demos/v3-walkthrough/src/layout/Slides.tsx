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
  DeckContext,
  Text
} from "spectacle";
import { DeckContextType } from "spectacle/lib/components/deck/deck";
import styled from "styled-components";
import { PolywrapClient } from "@polywrap/client-js";

import ExampleSlide from "../components/ExampleSlide";
import { uniswapV3Uri, examples } from "../constants";
import {
  theme,
  displayHeadingProps,
  fontFamilies,
  letterSpacing
} from "../styles/theme"
import UniswapLogo from "../images/uniswap-logo.svg";

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
`;

const StyledSubHeading = styled(Heading)`
  margin: 0;
  text-align: center;
  line-height: ${displayHeadingProps.lineHeight};
  letter-spacing: ${letterSpacing.PrimaryText};
  font-family: ${fontFamilies.sans};
`;

const SectionListContainer = styled.div`
  display: flex;
  overflow: auto;
`

const SectionListColumn = styled(UnorderedList)`
  flex: 50%
`;

const StyledSectionListItem = styled(ListItem)`
  color: #343A80;
  width: fit-content;
  text-decoration: none;
  list-style: none;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(0.35, 1.5, 0.65, 1);

  &:hover {
    color: #ffffff;
    cursor: pointer;
  }
`;

function Slides() {

  const goToSlide = (slide: number, skipTo: DeckContextType["skipTo"]) =>
    // slide + 2 because (intro & glossary slides)
    skipTo({ slideIndex: slide + 2, stepIndex: 0 });

  return (
    <Deck theme={theme} template={template}>
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <img src={UniswapLogo} alt="uniswap-logo" width={150} height={300} />
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
          Examples
        </StyledHeading>
        <DeckContext.Consumer>
          {(context) => (
            <SectionListContainer>
              <SectionListColumn>
              {examples.slice(0, examples.length / 2).map((e, index) => (
                <StyledSectionListItem
                  onClick={() => goToSlide(index, context.skipTo)}
                >
                  {e.name}
                </StyledSectionListItem>
              ))}
              </SectionListColumn>
              <SectionListColumn>
              {examples.slice(examples.length / 2).map((e, index) => (
                <StyledSectionListItem
                  onClick={() => goToSlide((examples.length / 2) + index, context.skipTo)}
                >
                  {e.name}
                </StyledSectionListItem>
              ))}
              </SectionListColumn>
            </SectionListContainer>
          )}
        </DeckContext.Consumer>
      </Slide>
      {examples.map((e) => (
        <ExampleSlide example={e} client={client} />
      ))}
    </Deck>
  );
}

export default Slides;
