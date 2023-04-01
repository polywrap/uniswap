import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Readme from "../pages/Readme";
import Schema from "../pages/Schema";
import Example from "../pages/Example";
import FunctionDocs from "../pages/FunctionDocs";
import ObjectDocs from "../pages/ObjectDocs";
import EnumDocs from "../pages/EnumDocs";
import ImportModuleDocs from "../pages/ImportModuleDocs";
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
        <Route path="/" element={<Readme />} />
        <Route path="/schema" element={<Schema />} />
        <Route path="/example/:id" element={<Example />} />
        <Route path="/function/:id" element={<FunctionDocs />} />
        <Route path="/object/:id" element={<ObjectDocs />} />
        <Route path="/import/object/:id" element={<ObjectDocs import />} />
        <Route path="/enum/:id" element={<EnumDocs />} />
        <Route path="/import/enum/:id" element={<EnumDocs import />} />
        <Route path="/import/module/:id" element={<ImportModuleDocs />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Main>
  );
}

export default Body;
