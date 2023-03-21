import React from "react";
import styled from "styled-components";

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
      <h1>
        Uniswap Wrapper!!!!
      </h1>
    </Main>
  );
}

export default Body;
