import React from "react";
import styled from "styled-components";

interface SidebarSection {
  name: string;
  children?: React.ReactNode;
  initOpen?: boolean;
  onClick?: React.MouseEventHandler;
}

const SectionHeading = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: white;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    border-bottom-style: dotted;
  }
`;

const SectionContainer = styled.div`
  margin-left: 15px;
`;

function SidebarSection(props: SidebarSection) {
  const [open, setOpen] = React.useState(!!props.initOpen);

  if (!props.children) {
    return (
      <SectionContainer>
        <SectionHeading onClick={props.onClick}>
          {props.name}
        </SectionHeading>
      </SectionContainer>
    );
  } else {
    return (
      <SectionContainer>
        <SectionHeading onClick={(e) => {
          setOpen(!open);
          if (props.onClick) {
            props.onClick(e);
          }
        }}>
          {(open ? "- " : "+ ") + props.name}
        </SectionHeading>
        {open && props.children}
      </SectionContainer>
    );
  }
}

export default SidebarSection;
