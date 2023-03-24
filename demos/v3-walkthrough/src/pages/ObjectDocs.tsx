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

const ObjectDescription = styled.h2`
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

  // Find the function
  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return (<div>{message}</div>);
  }

  const objects = abi.objectTypes || [];
  const object = objects.find((object) => object.type === id);

  if (!object) {
    const message = `Unable to find object "${id}".`;
    console.error(message);
    return (<div>{message}</div>);
  }

  return (
    <>
      <Title>
        Object: <b>{object.type}</b>
      </Title>
      {object?.comment && (
        <ObjectDescription>
          {object.comment}
        </ObjectDescription>
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
    </>
  );
}

export default ObjectDocs;
