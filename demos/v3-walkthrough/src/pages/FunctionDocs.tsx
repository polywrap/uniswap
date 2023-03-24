import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { Launch } from "@mui/icons-material";
import { usePolywrapClient } from "@polywrap/react";

import { useWrapManifest } from "../hooks/useWrapManifest";
import { uniswapV3Uri, examples } from "../constants";
import RenderSchema from "../components/RenderSchema";
import Loader from "../components/Loader";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";

const Title = styled.h1`
  font-weight: 100;
  font-stretch: expanded;
`;

const FunctionDescription = styled.h2`
  font-weight: 100;
  font-size: large;
`;

const SectionTitle = styled.h3``;

const ArgumentList = styled.ul`
  list-style: circle;
`;

const ArgumentName = styled.span`
  font-kerning: none;
  letter-spacing: 1px;
  font-weight: bold;
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
  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: uniswapV3Uri
  });
  const { id } = useParams<"id">();

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
  const exampleRefs = examples
    .filter((x) => x.method === method.name)
    .map((x) => x.name);

  return (
    <>
      <Title>
        Function: <b>{method.name}</b>
      </Title>
      {method?.comment && (
        <FunctionDescription>
          {method.comment}
        </FunctionDescription>
      )}
      <RenderSchema
        methods={[method]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi);

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
              <ExampleListItem onClick={() => navigate("/example/" + example)}>
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
