import React from "react";
import styled from "styled-components";
import {
  MethodDefinition,
  ObjectDefinition,
  EnumDefinition,
  ImportedObjectDefinition,
  ImportedEnumDefinition,
  ImportedModuleDefinition
} from "@polywrap/wrap-manifest-types-js";

import { trimPropType } from "../utils/trimPropType";

const globalStyles = `
  font-size: 14px;
  letter-spacing: 1px;
  color: white;
  font-weight: 700;
`;

export const Comment = styled.span`
  ${globalStyles}
  color: green;
`;

export const Keyword = styled.span`
  ${globalStyles}
  color: #0067d1;
`;

export const SpecialChar = styled.span`
  ${globalStyles}
  font-size: 16px;
  color: #e3e3e3;
`;

export const TypeName = styled.span`
  ${globalStyles}
  color: #00ff37;
`;

export const ClickableTypeName = styled(TypeName)`
  cursor: pointer;
`;

export const PropName = styled.span`
  ${globalStyles}
  color: #36b5ff;
`;

export const ClickablePropName = styled(PropName)`
  cursor: pointer;
`;

export const ArgName = styled.span`
  ${globalStyles}
  color: #cfcfcf;
`;

export const ConstantName = styled.span`
  ${globalStyles}
  color: #36b5ff;
`;

export interface RenderSchemaProps {
  methods?: MethodDefinition[];
  objects?: ObjectDefinition[];
  enums?: EnumDefinition[];
  importedObjects?: ImportedObjectDefinition[];
  importedEnums?: ImportedEnumDefinition[];
  importedModules?: ImportedModuleDefinition[];
  withModuleType?: boolean;
  withComments?: boolean;
  onTypeNameClick?: (typeName: string) => void;
  onFuncNameClick?: (funcName: string) => void;
}

function RenderSchema(props: RenderSchemaProps) {
  const {
    methods,
    objects,
    enums,
    importedObjects,
    importedEnums,
    importedModules,
    withModuleType,
    withComments,
    onTypeNameClick,
    onFuncNameClick
  } = props;

  const RenderTypeName = (props: { type: string, noClick?: boolean }) => {
    const { noClick } = props;

    let type = props.type;
    let prefix: string | undefined = undefined;
    let postfix: string | undefined = undefined;

    if (type[0] === "[") {
      const count = (type.match(/\[/) || []).length;
      prefix = "[".repeat(count);
      postfix = "]".repeat(count);
      type = trimPropType(type);
    }

    return (
      <>
      {prefix && <SpecialChar>{prefix}</SpecialChar>}
      {onTypeNameClick && !noClick ? (
        <ClickableTypeName onClick={() => onTypeNameClick(type)}>
          {type}
        </ClickableTypeName>
      ) : (
        <TypeName>{type}</TypeName>
      )}
      {postfix && <SpecialChar>{postfix}</SpecialChar>}
      </>
    );
  };

  const RenderWhitespace = (props: { indent: number }) => (
    <>{[...Array(props.indent)].map(() => (
      <>&nbsp;&nbsp;&nbsp;&nbsp;</>
    ))}</>
  );

  const methodIndent = withModuleType ? 1 : 0;

  const RenderComment = (props: { indent: number, comment: string }) => {
    let comment = props.comment;
    const maxCommentLen = 60;
    const commentParts = [];

    while (comment.length > 0) {
      // Find the next " " to break the string at
      const breakAt = comment.indexOf(" ", maxCommentLen);
      if (breakAt === -1) {
        commentParts.push(comment);
        comment = "";
      } else {
        commentParts.push(comment.substring(0, breakAt));
        comment = comment.substring(breakAt + 1);
      }
    }

    return (
      <>
      <RenderWhitespace indent={props.indent} />
      <Comment>"""<br/></Comment>
      {commentParts.map((part) => (
        <>
        <RenderWhitespace indent={props.indent} />
        <Comment>{part}<br/></Comment>
        </>
      ))}
      <RenderWhitespace indent={props.indent} />
      <Comment>"""<br/></Comment>
      </>
    );
  }

  return (
    <>
    {withModuleType && methods?.length && (
      <>
      <Keyword>{"type "}</Keyword>
      <TypeName>Module</TypeName>
      <SpecialChar>{" {"}</SpecialChar>
      <br/>
      </>
    )}
    {methods?.length && methods.map((method, index) => (
      <>
      {withComments && method.comment && (
        <RenderComment comment={method.comment} indent={methodIndent} />
      )}
      <RenderWhitespace indent={methodIndent} />
      {onFuncNameClick ? (
        <ClickablePropName onClick={() => onFuncNameClick(method.name || "")}>
          {method.name}
        </ClickablePropName>
      ) : (
        <PropName>{method.name}</PropName>
      )}
      {method.arguments?.length && (
        <>
        <SpecialChar>{"("}</SpecialChar><br/>
        {method.arguments.map((argument) => (
          <>
          {withComments && argument.comment && (
            <RenderComment comment={argument.comment} indent={methodIndent + 1} />
          )}
          <span>
            <RenderWhitespace indent={methodIndent + 1} />
            <ArgName>{argument.name}</ArgName>
            <SpecialChar>{": "}</SpecialChar>
            <RenderTypeName type={argument.type} />
            {argument.required && <SpecialChar>{"!"}</SpecialChar>}
            <br/>
          </span>
          </>
        ))}
        <RenderWhitespace indent={methodIndent} />
        <SpecialChar>{")"}</SpecialChar>
        </>
      )}{method.return && (
        <>
        <SpecialChar>{": "}</SpecialChar>
        <RenderTypeName type={method.return.type} />
        {method.return.required && <SpecialChar>{"!"}</SpecialChar>}
        </>
      )}<br/>
      {index < methods.length - 1 && <br/>}
      </>
    ))}
    {withModuleType && methods?.length && (
      <>
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      </>
    )}
    {objects?.length && objects.map((object, index) => (
      <>
      {methods?.length && <br/>}
      {withComments && object.comment && (
        <RenderComment comment={object.comment} indent={0} />
      )}
      <Keyword>{"type "}</Keyword>
      {onTypeNameClick ? (
        <ClickableTypeName onClick={() => onTypeNameClick(object.type)}>
          {object.type}
        </ClickableTypeName>
      ) : (
        <RenderTypeName type={object.type} noClick />
      )}
      <SpecialChar>{" {"}</SpecialChar>
      <br/>
      {object.properties?.map((property) => (
        <>
        {withComments && property.comment && (
          <RenderComment comment={property.comment} indent={1} />
        )}
        <span>
          <RenderWhitespace indent={1} />
          <PropName>{property.name}</PropName>
          <SpecialChar>{": "}</SpecialChar>
          <RenderTypeName type={property.type} />
          {property.required && <SpecialChar>{"!"}</SpecialChar>}
          <br/>
        </span>
        </>
      ))}
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      {index < objects.length - 1 && <br/>}
      </>
    ))}
    {objects?.length && <br />}
    {enums?.length && enums.map((enumDef, index) => (
      <>
      <Keyword>{"enum "}</Keyword>
      {onTypeNameClick ? (
        <ClickableTypeName onClick={() => onTypeNameClick(enumDef.type)}>
          {enumDef.type}
        </ClickableTypeName>
      ) : (
        <RenderTypeName type={enumDef.type} noClick />
      )}
      <SpecialChar>{" {"}</SpecialChar>
      <br/>
      {enumDef.constants?.map((constant) => (
        <span>
          <RenderWhitespace indent={1} />
          <ConstantName>{constant}</ConstantName>
          <br/>
        </span>
      ))}
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      {index < enums.length - 1 && <br/>}
      </>
    ))}
    {enums?.length && <br />}
    {importedObjects?.length && importedObjects.map((object, index) => (
      <>
      {withComments && object.comment && (
        <RenderComment comment={object.comment} indent={0} />
      )}
      <Keyword>{"type "}</Keyword>
      {onTypeNameClick ? (
        <ClickableTypeName onClick={() => onTypeNameClick(object.type)}>
          {object.type}
        </ClickableTypeName>
      ) : (
        <RenderTypeName type={object.type} noClick />
      )}
      <SpecialChar>{" {"}</SpecialChar>
      <br/>
      {object.properties?.map((property) => (
        <>
        {withComments && property.comment && (
          <RenderComment comment={property.comment} indent={1} />
        )}
        <span>
          <RenderWhitespace indent={1} />
          <PropName>{property.name}</PropName>
          <SpecialChar>{": "}</SpecialChar>
          <RenderTypeName type={property.type} />
          {property.required && <SpecialChar>{"!"}</SpecialChar>}
          <br/>
        </span>
        </>
      ))}
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      {index < importedObjects.length - 1 && <br/>}
      </>
    ))}
    {importedObjects?.length && <br />}
    {importedEnums?.length && importedEnums.map((enumDef, index) => (
      <>
      <Keyword>{"enum "}</Keyword>
      {onTypeNameClick ? (
        <ClickableTypeName onClick={() => onTypeNameClick(enumDef.type)}>
          {enumDef.type}
        </ClickableTypeName>
      ) : (
        <RenderTypeName type={enumDef.type} noClick />
      )}
      <SpecialChar>{" {"}</SpecialChar>
      <br/>
      {enumDef.constants?.map((constant) => (
        <span>
          <RenderWhitespace indent={1} />
          <ConstantName>{constant}</ConstantName>
          <br/>
        </span>
      ))}
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      {index < importedEnums.length - 1 && <br/>}
      </>
    ))}
    {importedModules?.length && importedModules.map((module, index) => (
      <>
      <Keyword>{"type "}</Keyword>
      {onTypeNameClick ? (
        <ClickableTypeName onClick={() => onTypeNameClick(module.type)}>
          {module.type}
        </ClickableTypeName>
      ) : (
        <RenderTypeName type={module.type} noClick />
      )}
      <SpecialChar>{" {"}</SpecialChar>
      <br/>
      {module.methods?.length && module.methods.map((method, index, methods) => (
        <>
        {withComments && method.comment && (
          <RenderComment comment={method.comment} indent={1} />
        )}
        <RenderWhitespace indent={1} />
        <PropName>{method.name}</PropName>
        {method.arguments?.length && (
          <>
          <SpecialChar>{"("}</SpecialChar><br/>
          {method.arguments.map((argument) => (
            <>
            {withComments && argument.comment && (
              <RenderComment comment={argument.comment} indent={2} />
            )}
            <span>
              <RenderWhitespace indent={2} />
              <ArgName>{argument.name}</ArgName>
              <SpecialChar>{": "}</SpecialChar>
              <RenderTypeName type={argument.type} />
              {argument.required && <SpecialChar>{"!"}</SpecialChar>}
              <br/>
            </span>
            </>
          ))}
          <RenderWhitespace indent={1} />
          <SpecialChar>{")"}</SpecialChar>
          </>
        )}{method.return && (
          <>
          <SpecialChar>{": "}</SpecialChar>
          <RenderTypeName type={method.return.type} />
          {method.return.required && <SpecialChar>{"!"}</SpecialChar>}
          </>
        )}
        <br/>
        {index < methods.length - 1 && <br/>}
        </>
      ))}
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      {index < importedModules.length - 1 && <br/>}
      </>
    ))}
    </>
  );
}

export default RenderSchema;
