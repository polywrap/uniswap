import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  background-color: #000000;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #3c3c3c;
  }

  &:active {
    box-shadow: none;
  }
`;

export default Button;
