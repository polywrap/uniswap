import React from 'react';
import { Box } from "@mui/material";
import {
  CopyAll,
  AutoStories,
  QuestionMark,
  Settings
} from "@mui/icons-material";
import styled from 'styled-components';

import { ThemeContext } from "../context/ThemeProvider";
import { uniswapV3Uri } from "../constants";
import Dropdown from "../components/Dropdown";
import PolywrapLogo from '../components/PolywrapLogo';
import MultiSelect from '../components/MultiSelect';
import {
  Theme,
  colorThemes,
  ColorThemes
} from '../styles/theme';

export const HEIGHT = "32px";

const HeaderContainer = styled.div`
  height: ${HEIGHT};
  padding-left: unset !important;
  padding-right: unset !important;
  max-width: unset !important;
  border-bottom: ${props => props.theme.colors[50]};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${props => props.theme.colors[900]};
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  position: sticky;
`;

function HeaderButton(props: {
  width: string;
  border_left?: boolean;
  border_right?: boolean;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  theme: Theme
}) {
  const Inner = styled(Box)`
    height: 100%;
    width: ${props.width};
    ${props.border_left ? `
    border-left: ${props.theme.colors[50]};
    border-left-style: solid;
    border-left-width: 1px;
    ` : ""}
    ${props.border_right ? `
    border-right: ${props.theme.colors[50]};
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

const HeaderSubcontainer = styled.div`
  display: flex;
  flex-direction: row;
`;

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

const SettingsMenu = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  display: grid;
  flex-direction: column;
  background-color: ${props => props.theme.colors[900]};
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0px;
  background-color: ${props => props.theme.colors[50]}3b;
`;

function Header() {
  const desktopWidth = 700;
  const [isDesktop, setDesktop] = React.useState(window.innerWidth > desktopWidth);
  const { theme, setTheme } = React.useContext(ThemeContext);

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
          theme={theme}
          width={isDesktop ? "120px" : "40px"}
          onClick={() => window.open("https://polywrap.io/", "_blank")?.focus()}
          border_right
        >
          <HeaderButtonIcon>
            <PolywrapLogo fill={theme.colors[50]} long={isDesktop} />
          </HeaderButtonIcon>
        </HeaderButton>
        <HeaderButton
          theme={theme}
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
          theme={theme}
          width={"auto"}
          border_left
        >
          <Dropdown
            inner={(
              <Settings />
            )}
          >
            <SettingsMenu>
              <MultiSelect
                title={"theme"}
                options={Object.keys(colorThemes)}
                onOptionSelect={(option: string) =>
                  setTheme({
                    colors: colorThemes[option as ColorThemes]
                  })
                }
                position={"right"}
              />
            </SettingsMenu>
          </Dropdown>
        </HeaderButton>
        <HeaderButton
          theme={theme}
          width={"auto"}
          border_left
          onClick={() => window.open("https://docs.polywrap.io", "_blank")}
        >
          <AutoStories style={{ margin: "5px" }} />
        </HeaderButton>
        <HeaderButton
          theme={theme}
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
