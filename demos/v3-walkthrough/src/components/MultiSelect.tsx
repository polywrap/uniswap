import React from "react";
import styled from "styled-components";
import {
  KeyboardArrowDown,
  KeyboardArrowUp
} from "@mui/icons-material";

import Button from "./Button";
import Dropdown, {
  DropdownContext,
  DropdownState
} from "./Dropdown";

const Title = styled.span`
  display: flex;
  align-items: center;
`;

const Options = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  display: grid;
  flex-direction: column;
  background-color: ${props => props.theme.colors[900]};
  border-radius: 5px;
  overflow: hidden;
  padding: 5px;
  margin: 10px 0px;
  background-color: ${props => props.theme.colors[50]}3b;
`;

export interface MultiSelectProps {
  style?: React.CSSProperties;
  title: string;
  options: string[];
  onOptionSelect: (option: string) => void;
  position?: "left" | "right";
}

function MultiSelect(props: MultiSelectProps) {
  const position = props.position || "left";
  const [dropdown, setDropdown] = React.useState(false);

  const Arrow = () => {
    const arrowStyle: React.CSSProperties = { pointerEvents: "none" };
    return (
      <>{
        dropdown ?
        <KeyboardArrowUp style={arrowStyle} /> :
        <KeyboardArrowDown style={arrowStyle} />
      }</>
    );
  }

  return (
    <Dropdown
      inner={(
        <Title>
          {position === "left" && <Arrow />}
          {props.title}
          {position === "right" && <Arrow />}
        </Title>
      )}
      onShowDropdown={(value) => setDropdown(value)}
    >
      <DropdownContext.Consumer>
      {(state: DropdownState) => (
        <Options>
        {props.options.map((option) => (
          <Button
            onClick={() => {
              setDropdown(false);
              state.setShowDropdown(false);
              props.onOptionSelect(option);
            }}
            style={{
              height: "32px",
              width: "100%",
              justifySelf: "end",
              marginBottom: "5px",
              textAlign: position
            }}
          >
            {option}
          </Button>
        ))}
        </Options>
      )}
      </DropdownContext.Consumer>
    </Dropdown>
  );
}

export default MultiSelect;
