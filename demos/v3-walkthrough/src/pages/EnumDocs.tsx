import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";

import { useWrapManifest } from "../hooks/useWrapManifest";
import { uniswapV3Uri } from "../constants";
import RenderSchema from "../components/RenderSchema";
import Loader from "../components/Loader";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";

const Title = styled.h1`
  font-weight: 100;
  font-stretch: expanded;
`;

const Description = styled.h2`
  font-weight: 100;
  font-size: large;
`;

function EnumDocs() {
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

  const enums = abi.enumTypes || [];
  const enumDef = enums.find((enumDef) => enumDef.type === id);

  if (!enumDef) {
    const message = `Unable to find enum "${id}".`;
    console.error(message);
    return (<div>{message}</div>);
  }

  return (
    <>
      <Title>
        Enum: <b>{enumDef.type}</b>
      </Title>
      {enumDef?.comment && (
        <Description>
          {enumDef.comment}
        </Description>
      )}
      <RenderSchema
        enums={[enumDef]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi);

          if (route) {
            navigate(route);
          }
        }}
      />
    </>
  );
}

export default EnumDocs;
