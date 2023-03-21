import React from "react";
import styled from "styled-components";

interface SidebarSection {
  name: string;
  children: React.ReactNode;
}

const SectionHeading = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: white;
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const SectionContainer = styled.div`
  margin-left: 15px;
`;

function SidebarSection(props: SidebarSection) {
  const [open, setOpen] = React.useState(false);

  return (
    <SectionContainer>
      <SectionHeading onClick={() => setOpen(!open)}>
        {(open ? "- " : "+ ") + props.name}
      </SectionHeading>
      {open && props.children}
    </SectionContainer>
  );
}

export default SidebarSection;
