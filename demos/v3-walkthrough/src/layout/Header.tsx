import React from 'react';
import { Box } from "@mui/material";
import { CopyAll, AutoStories, QuestionMark } from "@mui/icons-material";
import styled from 'styled-components';

import PolywrapLogo from '../components/PolywrapLogo';
import { uniswapV3Uri } from "../constants";

export const HEIGHT = "32px";

const HeaderContainer = styled.div`
  height: ${HEIGHT};
  padding-left: unset !important;
  padding-right: unset !important;
  max-width: unset !important;
  border-bottom: white;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: black;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  position: sticky;
`;

const HeaderSubcontainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function HeaderButton(props: {
  width: string;
  border_left?: boolean;
  border_right?: boolean;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
}) {
  const Inner = styled(Box)`
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
    ${props.onClick ? "cursor: pointer;" : ""}
  `;
  Inner.defaultProps = {
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  };
  return (
    <Inner onClick={props.onClick}>
      {props.children}
    </Inner>
  );
}

const HeaderButtonIcon = styled(Box)`
  height: 20px;
`;

const WrapUriContainer = styled.div`
  margin-left: 10px;
  margin-right: 5px;
  display: flex;
  flex-direction: row;
`;

const WrapUri = styled.h6`
  text-align: center;
  overflow-wrap: anywhere;
`;

const Source = styled.h6`
  text-align: center;
  overflow-wrap: anywhere;
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

  const uri = uniswapV3Uri;

  return (
    <HeaderContainer>
      <HeaderSubcontainer>
        <HeaderButton
          width={isDesktop ? "120px" : "40px"}
          onClick={() => window.open("https://polywrap.io/", "_blank")?.focus()}
          border_right
        >
          <HeaderButtonIcon>
            <PolywrapLogo fill="#ffffff" long={isDesktop} />
          </HeaderButtonIcon>
        </HeaderButton>
        <HeaderButton
          width={"auto"}
          border_right
        >
          <WrapUriContainer>
            <WrapUri>
              {uri}
            </WrapUri>
            <CopyAll
              style={{
                width: "12px",
                marginLeft: "5px",
                height: "unset",
                cursor: "pointer"
              }}
              onClick={() => uri && navigator.clipboard.writeText(uri)}
            />
          </WrapUriContainer>
        </HeaderButton>
      </HeaderSubcontainer>
      <HeaderSubcontainer>
        <HeaderButton
          width={"auto"}
          border_left
          onClick={() => window.open("https://docs.polywrap.io", "_blank")}
        >
          <AutoStories style={{ margin: "5px" }} />
        </HeaderButton>
        <HeaderButton
          width={"auto"}
          border_left
          onClick={() => window.open("https://discord.polywrap.io", "_blank")}
        >
          <QuestionMark style={{ margin: "5px" }} />
        </HeaderButton>
      </HeaderSubcontainer>
    </HeaderContainer>
  );
}

export default Header;
