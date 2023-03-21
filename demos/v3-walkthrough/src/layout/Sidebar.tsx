import React from "react";
import { Container } from "@mui/material";
import styled from "styled-components";

import { HEIGHT as HEADER_HEIGHT } from "./Header";

const SidebarContainer = styled.nav`
  top: ${HEADER_HEIGHT};
  left: 0;
  position: sticky;
  height: calc(100vh - ${HEADER_HEIGHT});
  flex: 0 0 200px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
      <div>foo bar baz</div>
    </SidebarContainer>
  );
}

export default Sidebar;
