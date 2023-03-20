import React from 'react';
import { Image } from "spectacle";
import styled from "styled-components";

import Logo from "../images/polywrap-logo.png";

const StyledLogo = styled(Image)`
  position: relative;
  height: 48px;
  width: auto;
  margin-top: 16px;
  margin-left: 16px;
  z-index: 1;
`;

function Header() {
  return (
    <header className="App-header">
      <a href={"https://polywrap.io"} target="_blank" rel="noreferrer">
        <StyledLogo src={Logo} />
      </a>
    </header>
  );
}

export default Header;
