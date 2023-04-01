import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { usePolywrapClient } from "@polywrap/react";

import SimpleExampleRunner from "./SimpleExampleRunner";
import { SimpleExample } from "../constants/examples";
import { InvokeResult } from "@polywrap/client-js";
import { PlayArrow, Settings, ManageSearch } from "@mui/icons-material";
import { useActiveWrapper } from "../hooks/useActiveWrapper";

function SimpleExampleContainer(props: {
  example: SimpleExample;
  id: string;
  onResult?: (result: InvokeResult) => void;
}) {
  const client = usePolywrapClient();
  const wrapper = useActiveWrapper();

  const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const DocsLink = styled.span`
    color: ${(props) => props.theme.colors[50]};
    display: flex;
    align-items: center;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `;

  const DocsText = styled.h6`
    color: ${(props) => props.theme.colors[50]};
    font-weight: 100;
  `;

  const Title = styled.h1`
    font-weight: 300;
  `;
  const navigate = useNavigate();
  const { name, description, uri, method, args } = props.example;

  return (
    <>
      <Header>
        <Title>{name}</Title>
        <DocsLink onClick={() => navigate(`${wrapper}/function/${method}`)}>
          <DocsText>docs</DocsText>
          <ManageSearch />
        </DocsLink>
      </Header>
      <SimpleExampleRunner
        id={props.id}
        example={props.example}
        client={client}
        onResult={props.onResult}
      />
    </>
  );
}

export default SimpleExampleContainer;
