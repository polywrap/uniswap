import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { Launch, UnfoldMore } from "@mui/icons-material";
import { usePolywrapClient } from "@polywrap/react";

import { useWrapManifest } from "../hooks/useWrapManifest";
import { uniswapV3Uri, examples, wrappers } from "../constants";
import RenderSchema from "../components/RenderSchema";
import Loader from "../components/Loader";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { useActiveWrapper } from "../hooks/useActiveWrapper";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 300;
`;

const TitleFunctionName = styled.span`
  font-weight: 400;
  font-family: 'Source Code Pro';
  background-color: ${props => props.theme.colors[800]};
  padding-left: 0.2em;
  padding-right: 0.2em;
  border-radius: 0.2em;
`;

const SchemaLink = styled.span`
  color: ${props => props.theme.colors[50]};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SchemaText = styled.h6`
  color: ${props => props.theme.colors[100]};
  font-weight: 400;
`;

const FunctionDescription = styled.h2`
  font-weight: 300;
  font-size: large;
`;

const SectionTitle = styled.h3`
  font-weight: 400;
`;

const ArgumentList = styled.ul`
  list-style: circle;
  line-height: 1.5em;
`;

const ArgumentName = styled.span`
  font-family: 'Source Code Pro';
  font-weight: 400;
  background-color: ${props => props.theme.colors[800]};
  padding-left: 0.2em;
  padding-right: 0.2em;
  border-radius: 0.2em;
`;

const ExampleList = styled.ul`
  list-style: none;
  padding-left: 16px;
`

const ExampleListItem = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function FunctionDocs() {
  const navigate = useNavigate();
  const client = usePolywrapClient();
  const { id } = useParams<"id">();
  
  const wrapper = useActiveWrapper();

  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: wrappers[wrapper]
  });

  if (loading) {
    return (<Loader />);
  } else if (error) {
    console.error(error);
    return (<div>{error.toString()}</div>);
  }

  // Find the function
  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return (<div>{message}</div>);
  }

  const methods = abi.moduleType?.methods || [];
  const method = methods.find((method) => method.name === id);

  if (!method) {
    const message = `Unable to find function "${id}".`;
    console.error(message);
    return (<div>{message}</div>);
  }

  // Find any examples including this function
  const exampleRefs = examples[wrapper]
    .filter((x) => 
      (x.type === "simple" && x.method === method.name) ||
      (x.type === "complex" && x.steps.some(s => s.method === method.name))
    )
    .map((x) => x.name);

  return (
    <>
      <Header>
        <Title>
          Function: <TitleFunctionName>{method.name}</TitleFunctionName>
        </Title>
        <SchemaLink
          onClick={() => navigate(`/${wrapper}/schema`)}
        >
          <SchemaText>schema</SchemaText>
          <UnfoldMore />
        </SchemaLink>
      </Header>
      {method?.comment && (
        <FunctionDescription>
          {method.comment}
        </FunctionDescription>
      )}
      <RenderSchema
        methods={[method]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi, wrapper);

          if (route) {
            navigate(route);
          }
        }}
      />
      {method?.arguments?.length && (
        <>
          <SectionTitle>
          Arguments
          </SectionTitle>
          <ArgumentList>
          {method.arguments.map((argument) => {
            const required = argument.required;
            return (
              <li>
                <ArgumentName>
                  {argument.name}
                </ArgumentName>
                {!required && " (optional)"}
                {" - "}
                {argument.comment || "no comment."}
              </li>
            );
          })}
          </ArgumentList>
        </>
      )}
      {exampleRefs.length > 0 && (
        <>
          <SectionTitle>
            Examples
          </SectionTitle>
          <ExampleList>
            {exampleRefs.map((example) => (
              <ExampleListItem onClick={() => navigate(`${wrapper}/example/${example}`)}>
                <span style={{ display: "flex" }}>
                  <Launch style={{ paddingRight: "0.5em" }} />
                  {example}
                </span>
              </ExampleListItem>
            ))}
          </ExampleList>
        </>
      )}
    </>
  );
}

export default FunctionDocs;
