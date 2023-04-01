import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { usePolywrapClient } from "@polywrap/react";

import { HEIGHT as HEADER_HEIGHT } from "./Header";
import { uniswapV3Uri, examples, wrappers } from "../constants";
import Loader from "../components/Loader";
import SidebarSection from "../components/SidebarSection";
import UniswapLogo from "../images/uniswap-logo.svg";
import { useWrapManifest } from "../hooks/useWrapManifest";
import { CopyAll } from "@mui/icons-material";
import { useActiveWrapper } from "../hooks/useActiveWrapper";

const SidebarContainer = styled.nav`
  top: ${HEADER_HEIGHT};
  left: 0;
  position: sticky;
  height: calc(100vh - ${HEADER_HEIGHT});
  flex: 0 0 200px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const LoadingContainer = styled.div`
  width: 100%;
  margin-top: 45px;
  text-align: center;
`;

const LoadingText = styled.div`
  line-height: 3.5em;
`;

const WrapLogo = styled.a`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  display: block;
`;

const WrapName = styled.h2`
  overflow-wrap: anywhere;
  margin: 0.1rem 0;
  margin-left: 10px;
  margin-right: 5px;
  line-height: 1.25;
  font-weight: 600;
  font-size: 1.375rem;
  text-align: center;
  cursor: pointer;
`;

const WrapType = styled.h5`
  margin: unset;
  text-align: center;
  font-weight: 400;
`;

const SidebarItem = styled.div`
  overflow-wrap: anywhere;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 5px;
  padding-top: 5px;
  &:hover {
    background: ${props => props.theme.colors[800]}
  }
`;

const WrapUriContainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
`;

const WrapUri = styled.h6`
  text-align: center;
  overflow-wrap: anywhere;
  font-weight: 400;
`;

function Sidebar() {
  const navigate = useNavigate();
  const client = usePolywrapClient();
  const wrapper = useActiveWrapper();
  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: wrapper ? wrappers[wrapper] : uniswapV3Uri
  });

  if (loading) {
    return (
      <SidebarContainer className="sidebar">
        <LoadingContainer>
          <Loader />
          <LoadingText>Loading Wrap...</LoadingText>
        </LoadingContainer>
      </SidebarContainer>
    );
  } else if (error) {
    // TODO: send user to resolution error page
    console.error(error);
    return (
      <SidebarContainer className="sidebar">
        <div>ERROR</div>
      </SidebarContainer>
    );
  } else if (!manifest) {
    // This should never happen
    console.error("This should never happen, manifest & error are both undefined.");
    return (
      <SidebarContainer className="sidebar">
        <div>ERROR</div>
      </SidebarContainer>
    );
  }

  const abi = manifest?.abi;
  const functions = abi?.moduleType?.methods || [];
  const env = abi?.envType;
  const objects = abi?.objectTypes || [];
  const importedObjects = abi?.importedObjectTypes || [];
  const enums = abi?.enumTypes || [];
  const importedEnums = abi?.importedEnumTypes || [];
  const importedModules = abi?.importedModuleTypes || [];
  const dependencies = [
    ...(abi?.importedEnumTypes?.map((i) => i.uri) || []),
    ...(abi?.importedEnvTypes?.map((i) => i.uri) || []),
    ...(abi?.importedModuleTypes?.map((i) => i.uri) || []),
    ...(abi?.importedObjectTypes?.map((i) => i.uri) || []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <SidebarContainer className="sidebar">
      <WrapLogo>
        <img src={UniswapLogo} alt="uniswap-logo" width={100} height={100} />
      </WrapLogo>
      <WrapName onClick={() => navigate("/" + wrapper)}>
        {manifest.name}
      </WrapName>
      <WrapType>
        {"[type: "}{manifest.type}{"]"}
      </WrapType>
      <WrapUriContainer>
        <WrapUri>
          {wrappers[wrapper]}
        </WrapUri>
        <CopyAll
          style={{
            width: "12px",
            marginLeft: "5px",
            height: "unset",
            cursor: "pointer"
          }}
          onClick={() => wrappers[wrapper] && navigator.clipboard.writeText(wrappers[wrapper])}
        />
      </WrapUriContainer>
      <SidebarSection name="README" onClick={() => navigate("/" + wrapper)}/>
      {examples && (
        <SidebarSection name="Examples" initOpen>
          {examples[wrapper].map((i) => (
            <SidebarItem onClick={() =>
              navigate(`/${wrapper}/example/${i.name}`)
            }>
              {i.name}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {functions.length > 0 && (
        <SidebarSection name="Functions">
          {functions.map((i) => (
            <SidebarItem onClick={() =>
              navigate(`/${wrapper}/function/${i.name}`)
            }>
              {i.name}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {env && (
        <SidebarSection name="Env">
          {env.properties?.map((i) => (
            <SidebarItem>
              {i.name}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {objects.length > 0 && (
        <SidebarSection name="Objects">
          {objects.map((i) => (
            <SidebarItem onClick={() =>
              navigate(`/${wrapper}/object/${i.type}`)
            }>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {enums.length > 0 && (
        <SidebarSection name="Enums">
          {enums.map((i) => (
            <SidebarItem onClick={() =>
              navigate(`/${wrapper}/enum/${i.type}`)
            }>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedObjects.length > 0 && (
        <SidebarSection name="Import Objects">
          {importedObjects.map((i) => (
            <SidebarItem onClick={() =>
              navigate("/import/object/" + i.type)
            }>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedEnums.length > 0 && (
        <SidebarSection name="Import Enums">
          {importedEnums.map((i) => (
            <SidebarItem onClick={() =>
              navigate("/import/enum/" + i.type)
            }>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedModules.length > 0 && (
        <SidebarSection name="Import Modules">
          {importedModules.map((i) => (
            <SidebarItem onClick={() =>
              navigate("/import/module/" + i.type)
            }>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {dependencies && (
        <SidebarSection name="Dependencies">
          {dependencies.map((i) => (
            <SidebarItem>
              {i}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      <SidebarSection name="Schema" onClick={() => navigate(`/${wrapper}/schema`)} />
    </SidebarContainer>
  );
}

export default Sidebar;
