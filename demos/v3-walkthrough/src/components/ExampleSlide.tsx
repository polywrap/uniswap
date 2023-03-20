import React from 'react';
import {
  Slide,
  FlexBox,
  Box,
  Heading,
  Text,
  CodePane,
  Grid,
} from "spectacle";
import styled from "styled-components";
import { InvokeResult, PolywrapClient } from "@polywrap/client-js";

import {
  displayHeadingProps,
  fontFamilies,
  letterSpacing
} from "../styles/theme";
import { Example } from "../constants";

import "./ExampleSlide.css";

const Spinner = () => <div className="loader"></div>;

const Play = (props: { onClick?: React.MouseEventHandler<unknown> | undefined }) =>
  <div onClick={props.onClick} className="play"></div>;

const Gear = (props: { onClick?: React.MouseEventHandler<unknown> | undefined }) =>
  <div onClick={props.onClick} className="gear"></div>;

const StyledHeading = styled(Heading)`
  margin: 0 0 16px 0;
  font-weight: 800;
  text-align: center;
  line-height: ${displayHeadingProps.lineHeight};
  letter-spacing: ${displayHeadingProps.letterSpacing};
  font-family: ${displayHeadingProps.fontFamily};
  font-stretch: expanded;
`

const StyledText = styled(Text)`
  text-align: center;
  letter-spacing: ${letterSpacing.PrimaryText};
  font-family: ${fontFamilies.sans};
`;

function ExampleSlide(props: { example: Example, client: PolywrapClient }) {
  const { name, description, uri, method, args } = props.example;
  const client = props.client;

  const [result, setResult] = React.useState<
    InvokeResult<unknown> | undefined
  >(undefined);
  const [waiting, setWaiting] = React.useState(false);
  const [inspect, setInspect] = React.useState(false);

  const run = async () => {
    setResult(undefined);
    setWaiting(true);
    const result = await client.invoke({
      uri,
      method,
      args
    });
    setResult(result);
  }

  return (
    <Slide>
      <FlexBox alignItems="center" justifyContent="center" flexDirection="column" height="40%" width="100%">
        <StyledHeading>{name}</StyledHeading>
        <StyledText textAlign="center">
          {description}
        </StyledText>
      </FlexBox>
      <Grid
        gridTemplateColumns="47.5% 5% 47.5%"
        height="60%"
        width="100%"
      >
        <FlexBox alignItems="center" justifyContent="center" flexDirection="column" overflow="auto">
          <Box overflow="auto" width="fill-available">
            {inspect ? (
              <CodePane showLineNumbers={false} language="json">
                {JSON.stringify(args, null, 2)}
              </CodePane>
            ) : (
              <CodePane showLineNumbers={false} language="ts">{`
              await client.invoke({
                uri: "${uri}",
                method: "${method}",
                args: {...}
              });
              `}
              </CodePane>
            )}
          </Box>
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="center" flexDirection="column">
          <Box paddingTop="50px">
            <Play onClick={run} />
          </Box>
          <Box paddingTop="50px">
            <Gear onClick={() => setInspect(!inspect)} />
          </Box>
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="center" flexDirection="column" overflow="auto">
          {result !== undefined ? (
            <>
              <Box overflow="auto" width="fill-available">
                <CodePane showLineNumbers={false} language="json">
                  {JSON.stringify(result, null, 2)}
                </CodePane>
              </Box>
            </>
          ) : (
            <>
              {waiting ? (<Spinner />) : (<></>)}
            </>
          )}
        </FlexBox>
      </Grid>
    </Slide>
  );
}

export default ExampleSlide;
