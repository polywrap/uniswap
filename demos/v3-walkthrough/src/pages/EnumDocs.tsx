import React from "react";
import styled from "styled-components";
import { UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";

import { useWrapManifest } from "../hooks/useWrapManifest";
import { uniswapV3Uri } from "../constants";
import RenderSchema from "../components/RenderSchema";
import ReferenceSection from "../components/ReferenceSection";
import Loader from "../components/Loader";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { getTypeRefRoutes } from "../utils/getTypeRefRoutes";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 100;
  font-stretch: expanded;
`;

const SchemaLink = styled.span`
  color: white;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SchemaText = styled.h6`
  color: white;
  font-weight: 100;
`;

const Description = styled.h2`
  font-weight: 100;
  font-size: large;
`;

const SectionTitle = styled.h3``;

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

  // Find all references in other parts of the ABI
  const refRoutes = getTypeRefRoutes(enumDef.type, abi);

  return (
    <>
      <Header>
        <Title>
          Enum: <b>{enumDef.type}</b>
        </Title>
        <SchemaLink
          onClick={() => navigate("/schema")}
        >
          <SchemaText>schema</SchemaText>
          <UnfoldMore />
        </SchemaLink>
      </Header>
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
      <ReferenceSection refRoutes={refRoutes} />
    </>
  );
}

export default EnumDocs;
