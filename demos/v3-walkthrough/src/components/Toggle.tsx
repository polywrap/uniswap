import React from "react";
import styled from "styled-components";
import Button from "./Button";

const ButtonIconLeft = styled.span`
  width: 0.5rem;
  margin-right: 0.5rem;
`;

const ButtonIconRight = styled.span`
  width: 0.5rem;
  margin-left: 0.5rem;
`;

interface ToggleProps {
  initValue?: boolean;
  onToggle?: (toggle: boolean) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  position?: "left" | "right";
}

function Toggle(props: ToggleProps) {
  const [toggle, setToggle] = React.useState(
    !!props.initValue
  );

  const position = props.position || "left";
  const icon = toggle ? "-" : "+";

  return (
    <Button style={props.style} onClick={() => {
      setToggle(!toggle);
      props.onToggle && props.onToggle(!toggle);
    }}>
      {position === "left" && <ButtonIconLeft>{icon}</ButtonIconLeft>}
      {props.children}
      {position === "right" && <ButtonIconRight>{icon}</ButtonIconRight>}
    </Button>
  )
}

export default Toggle;
