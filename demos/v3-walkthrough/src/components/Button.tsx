import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors[50]};
  background-color: ${props => props.theme.colors[900]};
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${props => props.theme.colors[50]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.colors[300]};
  }

  &:active {
    box-shadow: none;
  }
`;

export default Button;
