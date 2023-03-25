import React from "react";
import styled from "styled-components";

interface BodyProps {
  children: React.ReactNode;
}

const StyledContainer = styled.div`
  width: unset !important;
  padding: unset !important;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

function AppContainer(props: BodyProps) {
  return (
    <StyledContainer>
      {props.children}
    </StyledContainer>
  );
}

export default AppContainer;
