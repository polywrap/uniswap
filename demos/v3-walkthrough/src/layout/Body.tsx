import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Intro from "../pages/Intro";
import Schema from "../pages/Schema";
import Example from "../pages/Example";
import NoMatch from "../pages/NoMatch";

const Main = styled.main`
  padding-bottom: 50px;
  position: relative;
  flex-grow: 1;
  padding: 10px 15px 40px 45px;
  min-width: 0;
  display: block;
`

function Body() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/schema" element={<Schema />} />
        <Route path="/example/:id" element={<Example />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Main>
  );
}

export default Body;
