import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PlayArrow, Settings, ManageSearch } from "@mui/icons-material";
import { InvokeResult, PolywrapClient } from "@polywrap/client-js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack as syntax } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Loader from "./Loader";
import Spinner from "./Spinner";
import Button from "./Button";
import Toggle from "./Toggle";
import Dropdown from "./Dropdown";
import MultiSelect from './MultiSelect';
import { getInvokeSnippet } from '../utils/getInvokeSnippet';
import { InvokeLanguage, invokeLanguages } from '../utils/InvokeLanguage';
import { Example } from "../constants";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DocsLink = styled.span`
  color: ${props => props.theme.colors[50]};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const DocsText = styled.h6`
  color: ${props => props.theme.colors[50]};
  font-weight: 100;
`;

const Title = styled.h1`
  font-weight: 100;
  font-stretch: expanded;
`;

const Description = styled.h2`
  font-weight: 100;
  font-size: large;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const SettingsMenu = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  display: grid;
  flex-direction: column;
  background-color: ${props => props.theme.colors[900]};
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0px;
  background-color: ${props => props.theme.colors[50]}3b;
`;

const RunArrow = styled(PlayArrow)`
  height: 15px !important;
  width: 15px !important;
`;

const SnippetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  border-radius: 0.25rem;
  width: auto;
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
  width: 100%;
`;

const ResultText = styled.div`
  max-height: 50vh;
  font-weight: 500;
  font-size 0.90rem;
  overflow: auto;
`;

function ExampleRunner(props: {
  id: string,
  example: Example,
  client: PolywrapClient
}) {
  const navigate = useNavigate();
  const [result, setResult] = React.useState<
    Record<string, InvokeResult<unknown>>
  >({});
  const [waiting, setWaiting] = React.useState(false);
  const [inspectArgs, setInspectArgs] = React.useState(false);
  const [codegen, setCodegen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<
    InvokeLanguage
  >("TypeScript");

  const { name, description, uri, method, args } = props.example;
  const client = props.client;
  const id = props.id;

  const invokeSnippet = getInvokeSnippet(
    uri,
    "uniswap",
    method,
    args,
    selectedLanguage,
    inspectArgs,
    codegen
  );

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

  const toggleStyle: React.CSSProperties = {
    height: "32px",
    width: "fit-content",
    justifySelf: "end",
    marginBottom: "5px"
  };

  return (
    <>
    <Header>
      <Title>
        <b>{name}</b>
      </Title>
      <DocsLink
        onClick={() => navigate("/function/" + method)}
      >
        <DocsText>docs</DocsText>
        <ManageSearch />
      </DocsLink>
    </Header>
    <Description>{description}</Description>
    <SnippetContainer>
      <Controls>
        <Button
          style={{
            height: "28px",
            marginLeft: "10px",
          }}
          onClick={run}
        >
          <text style={{
            marginRight: "5px"
          }}>Run</text>
          {waiting ?
            <Spinner style={{
              height: "9px",
              width: "9px"
            }}/> :
            <RunArrow />
          }
        </Button>
        <Dropdown
          inner={(
            <Settings />
          )}
        >
          <SettingsMenu>
            <Toggle
              style={toggleStyle}
              position={"right"}
              initValue={inspectArgs}
              onToggle={(toggle) => setInspectArgs(toggle)}
            >
              Args
            </Toggle>
            <Toggle
              style={toggleStyle}
              position={"right"}
              initValue={codegen}
              onToggle={(toggle) => setCodegen(toggle)}
            >
              Codegen
            </Toggle>
            <MultiSelect
              title={selectedLanguage}
              options={invokeLanguages.flat()}
              onOptionSelect={(option) =>
                setSelectedLanguage(option as InvokeLanguage)
              }
              position={"right"}
            />
          </SettingsMenu>
        </Dropdown>
      </Controls>
      <SnippetText>
        <SyntaxHighlighter
          showLineNumbers={false}
          language={selectedLanguage.toLowerCase()}
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
