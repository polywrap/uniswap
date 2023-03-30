import React from "react";
import styled from "styled-components";
import { HashRouter, Route, Routes } from "react-router-dom";
import { DefaultBundle } from "@polywrap/client-js";
import { PolywrapProvider } from "@polywrap/react";

import ThemeProvider from "./context/ThemeProvider";
import Header from "./layout/Header";
import AppContainer from "./layout/AppContainer";
import Sidebar from "./layout/Sidebar";
import Body from "./layout/Body";

import "./styles/globals.css";
import { Config, DAppProvider, Goerli } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const Html = styled.html`
  background-color: ${(props) => props.theme.colors[900]};
  color: ${(props) => props.theme.colors[50]};
`;

const AppDiv = styled.div`
  max-width: 1200px;
  margin: auto;
  border-left: ${(props) => props.theme.colors[50]};
  border-left-style: solid;
  border-left-width: 1px;
  border-right: ${(props) => props.theme.colors[50]};
  border-right-style: solid;
  border-right-width: 1px;
`;

function App() {
  // Get the default client config
  const clientConfig = DefaultBundle.getConfig();
  const usedappConfig: Config = {
    networks: [Goerli],
    readOnlyUrls: {
      [Goerli.chainId]: getDefaultProvider('goerli')
    }
  };

  return (
    <ThemeProvider>
      <Html>
        <AppDiv className="app">
          <HashRouter>
            <DAppProvider config={usedappConfig}>
              <PolywrapProvider {...clientConfig}>
                <Header />
                <AppContainer>
                  <Routes>
                    <Route
                      path="/:wrapper?/*"
                      element={
                        <>
                          <Sidebar />
                          <Body />
                        </>
                      }
                    />
                  </Routes>
                </AppContainer>
              </PolywrapProvider>
            </DAppProvider>
          </HashRouter>
        </AppDiv>
      </Html>
    </ThemeProvider>
  );
}

export default App;
