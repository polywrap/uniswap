import React from "react";
import styled from "styled-components";
import { UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";

import { useWrapManifest } from "../hooks/useWrapManifest";
import { wrappers } from "../constants";
import RenderSchema from "../components/RenderSchema";
import ReferenceSection from "../components/ReferenceSection";
import Loader from "../components/Loader";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { getTypeRefRoutes } from "../utils/getTypeRefRoutes";
import { useActiveWrapper } from "../hooks/useActiveWrapper";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 300;
`;

const TitleEnumName = styled.span`
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
  color: ${props => props.theme.colors[50]};
  font-weight: 400;
`;

const Description = styled.h2`
  font-weight: 300;
  font-size: large;
`;

const SectionTitle = styled.h3``;

function EnumDocs() {
  const navigate = useNavigate();
  const client = usePolywrapClient();
  const wrapper = useActiveWrapper();
  let { manifest, error, loading } = useWrapManifest({
    client,
    uri: wrappers[wrapper]
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
  const refRoutes = getTypeRefRoutes(enumDef.type, abi, wrapper);

  return (
    <>
      <Header>
        <Title>
          Enum: <TitleEnumName>{enumDef.type}</TitleEnumName>
        </Title>
        <SchemaLink
          onClick={() => navigate(`/${wrapper}/schema`)}
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
          const route = getTypeNameRoute(name, abi, wrapper);

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
