import React from "react";
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
      <PolywrapProvider {...defaultConfig}>
        <Header />
        <AppContainer>
          <Sidebar />
          <Body />
        </AppContainer>
      </PolywrapProvider>
    </div>
  );
}

export default App;
