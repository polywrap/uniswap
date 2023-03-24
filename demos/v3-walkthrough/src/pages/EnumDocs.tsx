import React from "react";
import styled from "styled-components";
import { Share as RefLink, UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";

import { useWrapManifest } from "../hooks/useWrapManifest";
import { uniswapV3Uri } from "../constants";
import RenderSchema, {
  PropName,
  TypeName
} from "../components/RenderSchema";
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

const ReferenceSection = styled.h4`
  font-weight: 100;
`;

const ReferenceList = styled.ul`
  list-style: none;
  padding-left: 16px;
`

const ReferenceListItem = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
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
      {(refRoutes.functions.length > 0 || refRoutes.objects.length > 0) && (
        <>
        <SectionTitle>
          References
        </SectionTitle>
        {refRoutes.functions.length > 0 && (
          <>
          <ReferenceSection>Functions</ReferenceSection>
          <ReferenceList>
            {refRoutes.functions.map((nameRoute) => (
              <ReferenceListItem onClick={() => navigate(nameRoute.route)}>
                <span style={{ display: "flex" }}>
                  <RefLink style={{ paddingRight: "0.5em" }} />
                  <PropName>
                    {nameRoute.name}
                  </PropName>
                </span>
              </ReferenceListItem>
            ))}
          </ReferenceList>
          </>
        )}
        {refRoutes.objects.length > 0 && (
          <>
          <ReferenceSection>Objects</ReferenceSection>
          <ReferenceList>
            {refRoutes.objects.map((nameRoute) => (
              <ReferenceListItem onClick={() => navigate(nameRoute.route)}>
                <span style={{ display: "flex" }}>
                  <RefLink style={{ paddingRight: "0.5em" }} />
                  <TypeName>
                    {nameRoute.name}
                  </TypeName>
                </span>
              </ReferenceListItem>
            ))}
          </ReferenceList>
          </>
        )}
        </>
      )}
    </>
  );
}

export default EnumDocs;
