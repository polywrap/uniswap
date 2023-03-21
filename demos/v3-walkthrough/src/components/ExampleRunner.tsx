import React from 'react';
import { PlayArrow, Add } from "@mui/icons-material";
import styled from "styled-components";
import { InvokeResult, PolywrapClient } from "@polywrap/client-js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { xt256 as syntax } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Loader from "./Loader";
import { Example } from "../constants";

import "./ExampleRunner.css";

const Heading = styled.h1`
  font-weight: 800;
  letter-spacing: calc(var(--vmin, 1vmin) * 1);
  font-stretch: expanded;
  text-align: center;
`;

const Subheading = styled.h2`
  font-weight: 100;
  text-align: center;
`;

const SnippetContainer = styled.div`
  margin: auto;
  width: fit-content;
  max-width: 80%;
`;

const SnippetText = styled.div`
  max-height: 50vh;
  overflow: auto;
  margin-bottom: 10px;
`;

const SnippetControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RunButton = styled.button`
  display: flex;
  flex-direction: row;
  background: unset;
  color: white;
  border: white;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  &:hover {
    border: green;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
  }
`;

const RunArrow = styled(PlayArrow)`
  height: 15px !important;
  width: 15px !important;
`;

const ArgsButton = styled.button`
  display: flex;
  flex-direction: row;
  background: unset;
  color: white;
  border: white;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  &:hover {
    border-style: dotted;
  }
`;

const ArgsPlus = styled(Add)`
  height: 15px !important;
  width: 15px !important;
`;

const ResultTitle = styled.h3`
  font-weight: 800;
  text-align: center;
`;

const ResultContainer = styled.div`
  margin: auto;
  width: fit-content;
  max-width: 80%;
`;

const ResultText = styled.div`
  max-height: 50vh;
  overflow: auto;
  margin-bottom: 10px;
`;

function ExampleRunner(props: {
  id: string,
  example: Example,
  client: PolywrapClient
}) {
  const [result, setResult] = React.useState<
    Record<string, InvokeResult<unknown>>
  >({});
  const [waiting, setWaiting] = React.useState(false);
  const [inspectArgs, setInspectArgs] = React.useState(false);

  const { name, description, uri, method, args } = props.example;
  const client = props.client;
  const id = props.id;

  const argsString = JSON.stringify(args, null, 2)
    // Add another 2 spaces of indentation space per line
    .replaceAll("\n", "\n  ")
    // Convert { "key": "value" } to { key: "value" }
    .replace(/"([^"]+)":/g, '$1:');

  const invokeSnippet = `await client.invoke({
  uri: "${uri}",
  method: "${method}",
  args: ${inspectArgs ? argsString : "{...}"}
});`;

  const run = async () => {
    delete result[id];
    setResult(result);
    setWaiting(true);
    result[id] = await client.invoke({
      uri,
      method,
      args
    });
    setResult(result);
    setWaiting(false);
  }

  return (
    <>
      <Heading>
        {name}
      </Heading>
      <Subheading>
        {description}
      </Subheading>
      <SnippetContainer>
        <SnippetText>
          <SyntaxHighlighter
            showLineNumbers={false}
            language="typescript"
            style={syntax}
          >
            {invokeSnippet}
          </SyntaxHighlighter>
        </SnippetText>
        <SnippetControls>
          <ArgsButton onClick={() => setInspectArgs(!inspectArgs)}>
            <ArgsPlus /><text>args</text>
          </ArgsButton>
          <RunButton onClick={run}>
            <RunArrow /><text>run</text>
          </RunButton>
        </SnippetControls>
      </SnippetContainer>
      {(waiting || result[id] !== undefined) && (
        <>
          <ResultTitle>Result</ResultTitle>
          {waiting ?
            <Loader /> :
            <ResultContainer>
              <ResultText>
                <SyntaxHighlighter showLineNumbers={false} language="json" style={syntax}>
                  {
                    JSON.stringify(result[id], null, 2)
                      .replace(/"([^"]+)":/g, '$1:')
                  }
                </SyntaxHighlighter>
              </ResultText>
            </ResultContainer>
          }
        </>
      )}
    </>
  );
}

export default ExampleRunner;
