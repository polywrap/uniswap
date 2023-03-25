import React from "react";
import { HashRouter } from "react-router-dom";
import { DefaultBundle } from "@polywrap/client-js";
import { PolywrapProvider } from "@polywrap/react";

import Header from "./layout/Header";
import AppContainer from "./layout/AppContainer";
import Sidebar from "./layout/Sidebar";
import Body from "./layout/Body";

import "./styles/globals.css";

const defaultConfig = DefaultBundle.getConfig();

function App() {
  return (
    <div className="app">
      <HashRouter>
      <PolywrapProvider {...defaultConfig}>
        <Header />
        <AppContainer>
          <Sidebar />
          <Body />
        </AppContainer>
      </PolywrapProvider>
      </HashRouter>
    </div>
  );
}

export default App;
