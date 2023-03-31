import React from "react";
import styled from "styled-components";
import { HashRouter } from "react-router-dom";
import { DefaultBundle } from "@polywrap/client-js";
import { PolywrapProvider } from "@polywrap/react";

import ThemeProvider from "./context/ThemeProvider";
import Header from "./layout/Header";
import AppContainer from "./layout/AppContainer";
import Sidebar from "./layout/Sidebar";
import Body from "./layout/Body";

import "./styles/globals.css";

const Root = styled.div`
  background-color: ${props => props.theme.colors[900]};
  color: ${props => props.theme.colors[50]};
`;

const AppDiv = styled.div`
  max-width: 1200px;
  margin: auto;
  border-left: ${props => props.theme.colors[50]};
  border-left-style: solid;
  border-left-width: 1px;
  border-right: ${props => props.theme.colors[50]};
  border-right-style: solid;
  border-right-width: 1px;
`

function App() {
  // Get the default client config
  const defaultConfig = DefaultBundle.getConfig();

  return (
    <ThemeProvider>
      <Root>
        <AppDiv className="app">
          <HashRouter>
          <PolywrapProvider {...defaultConfig}>
            <Header />
            <AppContainer>
              <Sidebar />
              <Body />
            </AppContainer>
          </PolywrapProvider>
          </HashRouter>
        </AppDiv>
      </Root>
    </ThemeProvider>
  );
}

export default App;
