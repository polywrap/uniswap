import React from "react";
import styled from "styled-components";

import "./Spinner.css";

export interface SpinnerProps {
  style?: React.CSSProperties;
}

const SpinnerDiv = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.theme.colors[50]}40;
  border-radius: 50%;
  border-top-color: ${props => props.theme.colors[50]};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
`;

function Spinner(props: SpinnerProps) {
  return (
    <SpinnerDiv className="spinner" style={props.style} />
  );
}

export default Spinner;
