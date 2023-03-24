import React from "react";
import styled from "styled-components";
import { Share as RefLink } from "@mui/icons-material";
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

const Title = styled.h1`
  font-weight: 100;
  font-stretch: expanded;
`;

const Description = styled.h2`
  font-weight: 100;
  font-size: large;
`;

const SectionTitle = styled.h3``;

const PropertyList = styled.ul`
  list-style: circle;
`;

const PropertyName = styled.span`
  font-kerning: none;
  letter-spacing: 1px;
  font-weight: bold;
`;

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

function ObjectDocs() {
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

  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return (<div>{message}</div>);
  }

  // Find the object
  const objects = abi.objectTypes || [];
  const object = objects.find((object) => object.type === id);

  if (!object) {
    const message = `Unable to find object "${id}".`;
    console.error(message);
    return (<div>{message}</div>);
  }

  // Find all references in other parts of the ABI
  const refRoutes = getTypeRefRoutes(object.type, abi);

  return (
    <>
      <Title>
        Object: <b>{object.type}</b>
      </Title>
      {object?.comment && (
        <Description>
          {object.comment}
        </Description>
      )}
      <RenderSchema
        objects={[object]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi);

          if (route) {
            navigate(route);
          }
        }}
      />
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

export default ObjectDocs;
