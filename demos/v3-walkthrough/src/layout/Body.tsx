import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";

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
      <Typography variant="h1">
        Uniswap Wrapper!!!!
      </Typography>
    </Main>
  );
}

export default Body;
