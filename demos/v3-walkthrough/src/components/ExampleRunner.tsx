import React from 'react';
import { PlayArrow } from "@mui/icons-material";
import styled from "styled-components";
import { InvokeResult, PolywrapClient } from "@polywrap/client-js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack as syntax } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Loader from "./Loader";
import { Example } from "../constants";
import "./ExampleRunner.css";

const Heading = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-align: left;
`;

const Subheading = styled.p`
  font-size: 1.0rem;
  font-weight: 200;
  color: #b3bcc3;
  margin-top: 0.5rem;
  margin-bottom: 0;
  line-height: 1.5;
  text-align: left;
`;

const SnippetControls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

const RunButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  font-size: 1.0rem;
  font-weight: 500;
  color: #fff;
  justify-content: center;
  background-color: #198754;
  border: none;
  border-radius: 5px;
  width: 5.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0d6efd;
  }

  &:active {
    box-shadow: none;
  }
`;

const RunArrow = styled(PlayArrow)`
  height: 15px !important;
  width: 15px !important;
`;

const ArgsButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  font-size: 1.0rem;
  font-weight: 500;
  color: #fff;
  background-color: #212529;
  border: none;
  border-radius: 5px;
  width: 5.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0d6efd;
    border: none;
  }

  &:active {
    box-shadow: none;
  }
`;

const ArgsIcon = styled.span`
  margin-right: 0.5rem;
`;

const SnippetContainer = styled.div`
  display: flex;
  margin: auto;
  border-radius: 0.25rem;
`;

const SnippetText = styled.div`
  max-height: 50vh;
  font-size: 0.90rem;
  overflow: auto;
`;

const ResultTitle = styled.h3`
  font-weight: 600;
  text-align: left;
`;

const ResultContainer = styled.div`
  display: flex;
  margin: auto;
`;

const ResultText = styled.div`
  max-height: 50vh;
  font-weight: 500;
  font-size 0.90rem;
  overflow: auto;
`;

const Controls = styled.div`
  display: flex;
  width: 100%;
  border-bottom: #31373C;
  border-bottom-style: solid;
  border-bottom-width: 1px;

  @media (max-width: 768px) {
  }
`;

function ExampleControls(props: {
  name: string,
  description: string,
}) {
  return (
    <Controls>
      <Heading>
        {props.name}
      <Subheading>
        {props.description}
      </Subheading>
      </Heading>
    </Controls>
  )
}

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
    <ExampleControls name={name} description={description}/>
      <SnippetControls>
        <ArgsButton onClick={() => setInspectArgs(!inspectArgs)}>
            <ArgsIcon>{inspectArgs ? "-" : "+"}</ArgsIcon>
            args
        </ArgsButton>
          <RunButton onClick={run}>
            <RunArrow /><text>run</text>
          </RunButton>
        </SnippetControls>
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
