import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Slides from './Slides';
import "./styles/globals.css";
import {Image} from "spectacle";
import styled from "styled-components";
import Logo from "./images/Logo.png";

const StyledLogo = styled(Image)`
  position: relative;
  height: 48px;
  width: auto;
  margin-top: 16px;
  margin-left: 16px;
  z-index: 1;
`

ReactDOM.render(
  <StrictMode>
    <a href={"https://polywrap.io"} target="_blank" rel="noreferrer"><StyledLogo src={Logo} /></a>
    <Slides />
  </StrictMode>,
  document.getElementById('root')
);
