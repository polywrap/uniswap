import React from "react";

import Header from "./layout/Header";
import AppContainer from "./layout/AppContainer";
import Sidebar from "./layout/Sidebar";
import Body from "./layout/Body";

import "./styles/globals.css";

function App() {
  return (
    <div className="app">
      <Header />
      <AppContainer>
        <Sidebar />
        <Body />
      </AppContainer>
    </div>
  );
}

export default App;
