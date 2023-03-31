import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack as syntax } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { readme } from "../constants/readme";
import { CodeProps } from "react-markdown/lib/ast-to-react";

const Markdown = styled(ReactMarkdown)`
a {
  color: ${props => props.theme.colors[100]};
}

a:visited {
  color: ${props => props.theme.colors[300]};
}
`;

function Readme() {
  return (
    <Markdown
      remarkPlugins={[remarkExternalLinks]}
      components={{
        code: (props: CodeProps) => {
          const language =
            props.lang ||
            props.className?.replace("language-", "") ||
            "";

          return (
            <SyntaxHighlighter language={language} style={syntax}>
              {props.children as unknown as string[]}
            </SyntaxHighlighter>
          );
        }
      }}
    >
      {readme}
    </Markdown>
  );
}

export default Readme;