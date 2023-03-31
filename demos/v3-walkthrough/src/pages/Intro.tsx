import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import { readme } from "../constants/readme";

const Markdown = styled(ReactMarkdown)`
a {
  color: ${props => props.theme.colors[100]};
}

a:visited {
  color: ${props => props.theme.colors[300]};
}
`;

function Intro() {
  return (
    <Markdown>
      {readme}
    </Markdown>
  );
}

export default Intro;