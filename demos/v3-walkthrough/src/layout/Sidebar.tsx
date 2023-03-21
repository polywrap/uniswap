import React, { useEffect } from "react";
import styled from "styled-components";
import { usePolywrapClient } from "@polywrap/react";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";

import { HEIGHT as HEADER_HEIGHT } from "./Header";
import Loader from "../components/Loader";
import SidebarSection from "../components/SidebarSection";
import UniswapLogo from "../images/uniswap-logo.svg";
import { uniswapV3Uri } from "../constants";

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
  font-weight: 500;
  font-size: 1.375rem;
  text-align: center;
`;

const WrapType = styled.h5`
  margin: unset;
  text-align: center;
  font-weight: 100;
`

function Sidebar() {
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
  const objects = abi?.objectTypes;
  const enums = abi?.enumTypes;

  return (
    <SidebarContainer className="sidebar">
      <WrapLogo>
        <img src={UniswapLogo} alt="uniswap-logo" width={100} height={100} />
      </WrapLogo>
      <WrapName>
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
      {functions && (
        <SidebarSection name="Functions">
          {functions.map((i) => (
            <div>
              {i.name}
            </div>
          ))}
        </SidebarSection>
      )}
      {objects && (
        <SidebarSection name="Objects">
          {objects.map((i) => (
            <div>
              {i.type}
            </div>
          ))}
        </SidebarSection>
      )}
      {enums && (
        <SidebarSection name="Enums">
          {enums.map((i) => (
            <div>
              {i.type}
            </div>
          ))}
        </SidebarSection>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;
