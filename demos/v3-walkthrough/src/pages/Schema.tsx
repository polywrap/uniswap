import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import { usePolywrapClient } from "@polywrap/react";
import { renderSchema } from "@polywrap/schema-compose";

import { uniswapV3Uri } from "../constants";
import { useWrapManifest } from "../hooks/useWrapManifest";
import RenderSchema from "../components/RenderSchema";
import Loader from "../components/Loader";
import Toggle from "../components/Toggle";
import Dropdown from "../components/Dropdown";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: end;
`;

const SettingsMenu = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: ${props => props.theme.colors[900]};
  border-radius: 5px;
  overflow: hidden;
  padding: 5px 0px;
`;

function Schema() {
  const navigate = useNavigate();
  const client = usePolywrapClient();
  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: uniswapV3Uri
  });
  const [schema, setSchema] = React.useState<
    string | undefined
  >(undefined);
  const [withComments, setWithComments] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      setSchema(undefined);
    } else if (manifest && !schema) {
      setSchema(renderSchema(manifest.abi, false));
    }
  }, [loading]);

  if (loading) {
    return (
      <Loader style={{ width: "100%", marginTop: "45px" }} />
    );
  } else if (error || !manifest) {
    console.error(error);
    return (
      <div>
        Failed to fetch manifest.
      </div>
    );
  }

  const abi = manifest.abi;

  return (
    <>
    <Header>
      <Dropdown
        inner={(
          <Settings />
        )}
      >
        <SettingsMenu>
          <Toggle
            style={{ height: "32px" }}
            initValue={withComments}
            onToggle={(toggle) => setWithComments(toggle)}
            position={"right"}
          >
            Comments
          </Toggle>
        </SettingsMenu>
      </Dropdown>
    </Header>
    <RenderSchema
      withModuleType
      withComments={withComments}
      methods={abi.moduleType?.methods}
      objects={abi.objectTypes}
      enums={abi.enumTypes}
      onTypeNameClick={(name) => {
        const route = getTypeNameRoute(name, abi);

        if (route) {
          navigate(route);
        }
      }}
      onFuncNameClick={(name) => {
        navigate("/function/" + name);
      }}
    />
    </>
  );
}

export default Schema;
