import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePolywrapClient } from "@polywrap/react";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";

import { HEIGHT as HEADER_HEIGHT } from "./Header";
import Loader from "../components/Loader";
import SidebarSection from "../components/SidebarSection";
import UniswapLogo from "../images/uniswap-logo.svg";
import { uniswapV3Uri, examples } from "../constants";

const SidebarContainer = styled.nav`
  top: ${HEADER_HEIGHT};
  left: 0;
  position: sticky;
  height: calc(100vh - ${HEADER_HEIGHT});
  flex: 0 0 200px;
  overflow-x: hidden;
  overflow-y: scroll;
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
  font-weight: 100;
`;

const SidebarItem = styled.div`
  overflow-wrap: anywhere;
  cursor: pointer;
  font-size: smaller;
  padding-bottom: 5px;
  padding-top: 5px;
  &:hover {
    background: #323232
  }
`;

function Sidebar() {
  const navigate = useNavigate();
  const client = usePolywrapClient();
  const [wrapManifest, setWrapManifest] = React.useState<
    WrapManifest | undefined
  >(undefined);

  useEffect(() => {
    const fetchManifest = async () => {
      const manifest = await client.getManifest(uniswapV3Uri);
      if (!manifest.ok) {
        console.error(
          "Failed to fetch manifest from " + uniswapV3Uri +
          "\nError: " + manifest.error
        );
        return;
      }

      setWrapManifest(manifest.value);
    }

    fetchManifest();
  }, []);

  const isLoading = !wrapManifest;
  const abi = wrapManifest?.abi;
  const functions = abi?.moduleType?.methods;
  const env = abi?.envType;
  const objects = abi?.objectTypes;
  const enums = abi?.enumTypes;
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
      <WrapName onClick={() => navigate("/")}>
        {isLoading ?
          <Loader style={{ width: "100%" }} /> :
          wrapManifest.name
        }
      </WrapName>
      <WrapType>
        {isLoading ?
          <></> :
          <>
          {"[type: "}<b>{wrapManifest.type}</b> {"]"}
          </>
        }
      </WrapType>
      {!isLoading && (
        <>
          <SidebarSection name="README" />
          <SidebarSection name="Examples" initOpen>
            {examples.map((i) => (
              <SidebarItem onClick={() =>
                navigate("/example/" + i.name.toLowerCase().replaceAll(" ", "-"))
              }>
                {i.name}
              </SidebarItem>
            ))}
          </SidebarSection>
        </>
      )}
      {functions && (
        <SidebarSection name="Functions">
          {functions.map((i) => (
            <SidebarItem>
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
      {objects && (
        <SidebarSection name="Objects">
          {objects.map((i) => (
            <SidebarItem>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {enums && (
        <SidebarSection name="Enums">
          {enums.map((i) => (
            <SidebarItem>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {!isLoading && dependencies && (
        <SidebarSection name="Dependencies">
          {dependencies.map((i) => (
            <SidebarItem>
              {i}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {!isLoading && (
        <SidebarSection name="Schema" onClick={() => navigate("/schema")} />
      )}
    </SidebarContainer>
  );
}

export default Sidebar;
