import React from 'react';
import { Box, Container, Link } from "@mui/material";
import styled from 'styled-components';

import PolywrapLogo from '../components/PolywrapLogo';

export const HEIGHT = "31px";

const HeaderContainer = styled(Container)`
  height: ${HEIGHT};
  padding-left: unset !important;
  padding-right: unset !important;
  max-width: unset !important;
  border-bottom: white;
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

function HeaderButton(props: {
  width: string;
  border_left?: boolean;
  border_right?: boolean;
  href?: string;
  target?: string;
  children: React.ReactNode;
}) {
  const Inner = styled(Link)`
    height: 100%;
    width: ${props.width};
    ${props.border_left ? `
    border-left: white;
    border-left-style: solid;
    border-left-width: 1px;
    ` : ""}
    ${props.border_right ? `
    border-right: white;
    border-right-style: solid;
    border-right-width: 1px;
    ` : ""}
  `;
  Inner.defaultProps = {
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  };
  return (
    <Inner href={props.href} target={props.target}>
      {props.children}
    </Inner>
  );
}

const HeaderButtonIcon = styled(Box)`
  height: 20px;
`;

function Header() {
  const desktopWidth = 700;
  const [isDesktop, setDesktop] = React.useState(window.innerWidth > desktopWidth);

  const updateMedia = () => {
    setDesktop(window.innerWidth > desktopWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <HeaderContainer>
      <HeaderButton
        width={isDesktop ? "120px" : "40px"}
        href="https://polywrap.io/"
        target="_blank"
        border_right
      >
        <HeaderButtonIcon>
          <PolywrapLogo fill="#ffffff" long={isDesktop} />
        </HeaderButtonIcon>
      </HeaderButton>
    </HeaderContainer>
  );
}

export default Header;
