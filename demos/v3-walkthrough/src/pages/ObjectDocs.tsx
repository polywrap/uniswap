import React from "react";
import styled from "styled-components";
import { UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";
import { ImportedObjectDefinition } from "@polywrap/wrap-manifest-types-js";

import { useWrapManifest } from "../hooks/useWrapManifest";
import { uniswapV3Uri, wrappers } from "../constants";
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

const TitleObjectName = styled.span`
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

const SectionTitle = styled.h3`
  font-weight: 400;
`;

const PropertyList = styled.ul`
  list-style: circle;
  line-height: 1.5em;
`;

const PropertyName = styled.span`
  font-family: 'Source Code Pro';
  font-weight: 400;
  background-color: ${props => props.theme.colors[800]};
  padding-left: 0.2em;
  padding-right: 0.2em;
  border-radius: 0.2em;
`;

interface ObjectDocsProps {
  import?: boolean;
}

function ObjectDocs(props: ObjectDocsProps) {
  const navigate = useNavigate();
  const client = usePolywrapClient();
  const wrapper = useActiveWrapper();
  let { manifest, error, loading } = useWrapManifest({
    client,
    uri: wrappers[wrapper]
  });
  const { id } = useParams<"id">();

  if (loading) {
    return (<Loader style={{ width: "100%", marginTop: "45px" }} />);
  } else if (error) {
    console.error(error);
    return (<div>{error.toString()}</div>);
  }

  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return (<div>{message}</div>);
  }

  // Find the object
  const objects = (
    props.import ?
    abi.importedObjectTypes :
    abi.objectTypes
  ) || [];
  const object = objects.find((object) => object.type === id);

  if (!object) {
    const message = `Unable to find object "${id}".`;
    console.error(message);
    return (<div>{message}</div>);
  }

  // Find all references in other parts of the ABI
  const refRoutes = getTypeRefRoutes(object.type, abi, wrapper);

  return (
    <>
      <Header>
        <Title>
          Object: <TitleObjectName>{object.type}</TitleObjectName>
        </Title>
        <SchemaLink
          onClick={() => navigate(`/${wrapper}/schema`)}
        >
          <SchemaText>schema</SchemaText>
          <UnfoldMore />
        </SchemaLink>
      </Header>
      {object?.comment && (
        <Description>
          {object.comment}
        </Description>
      )}
      <RenderSchema
        objects={[object]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi, wrapper);

          if (route) {
            navigate(route);
          }
        }}
      />
      {props.import && (
        <>
          <SectionTitle>
          URI
          </SectionTitle>
          {(object as ImportedObjectDefinition).uri}
        </>
      )}
      {object?.properties?.length && (
        <>
          <SectionTitle>
          Properties
          </SectionTitle>
          <PropertyList>
          {object.properties.map((property) => {
            const required = property.required;
            return (
              <li>
                <PropertyName>
                  {property.name}
                </PropertyName>
                {!required && " (optional)"}
                {" - "}
                {property.comment || "no comment."}
              </li>
            );
          })}
          </PropertyList>
        </>
      )}
      <ReferenceSection refRoutes={refRoutes} />
    </>
  );
}

export default ObjectDocs;
