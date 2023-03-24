import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Share as RefLink } from "@mui/icons-material";

import {
  PropName,
  TypeName
} from "../components/RenderSchema";
import { TypeRefRoutes } from "../utils/getTypeRefRoutes";

interface ReferenceSectionProps {
  refRoutes: TypeRefRoutes;
}

const SectionTitle = styled.h3``;

const SubSectionTitle = styled.h4`
  font-weight: 100;
`;

const ReferenceList = styled.ul`
  list-style: none;
  padding-left: 16px;
`

const ReferenceListItem = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export function ReferenceSection(props: ReferenceSectionProps) {
  const navigate = useNavigate();
  const { refRoutes } = props;

  return (
    <>
    {(
      refRoutes.functionArgs.length > 0 ||
      refRoutes.functionRets.length > 0 ||
      refRoutes.objects.length > 0
    ) && (
      <>
      <SectionTitle>
        References
      </SectionTitle>
      {refRoutes.functionArgs.length > 0 && (
        <>
        <SubSectionTitle>Function Arg</SubSectionTitle>
        <ReferenceList>
          {refRoutes.functionArgs.map((nameRoute) => (
            <ReferenceListItem onClick={() => navigate(nameRoute.route)}>
              <span style={{ display: "flex" }}>
                <RefLink style={{ paddingRight: "0.5em" }} />
                <PropName>
                  {nameRoute.name}
                </PropName>
              </span>
            </ReferenceListItem>
          ))}
        </ReferenceList>
        </>
      )}
      {refRoutes.functionRets.length > 0 && (
        <>
        <SubSectionTitle>Function Result</SubSectionTitle>
        <ReferenceList>
          {refRoutes.functionRets.map((nameRoute) => (
            <ReferenceListItem onClick={() => navigate(nameRoute.route)}>
              <span style={{ display: "flex" }}>
                <RefLink style={{ paddingRight: "0.5em" }} />
                <PropName>
                  {nameRoute.name}
                </PropName>
              </span>
            </ReferenceListItem>
          ))}
        </ReferenceList>
        </>
      )}
      {refRoutes.objects.length > 0 && (
        <>
        <SubSectionTitle>Object Property</SubSectionTitle>
        <ReferenceList>
          {refRoutes.objects.map((nameRoute) => (
            <ReferenceListItem onClick={() => navigate(nameRoute.route)}>
              <span style={{ display: "flex" }}>
                <RefLink style={{ paddingRight: "0.5em" }} />
                <TypeName>
                  {nameRoute.name}
                </TypeName>
              </span>
            </ReferenceListItem>
          ))}
        </ReferenceList>
        </>
      )}
      </>
    )}
    </>
  );
}

export default ReferenceSection;
