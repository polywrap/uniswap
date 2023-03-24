import React from "react";
import styled from "styled-components";
import { MethodDefinition, ObjectDefinition, EnumDefinition } from "@polywrap/wrap-manifest-types-js";

const globalStyles = `
  font-size: 14px;
  letter-spacing: 1px;
  color: white;
  font-weight: 700;
`;

const Keyword = styled.span`
  ${globalStyles}
  color: #0067d1;
`;

const SpecialChar = styled.span`
  ${globalStyles}
  font-size: 16px;
  color: #e3e3e3;
`;

const TypeName = styled.span`
  ${globalStyles}
  color: #00ff37;
`;

const ClickableTypeName = styled(TypeName)`
  cursor: pointer;
`;

const PropName = styled.span`
  ${globalStyles}
  color: #36b5ff;
`;

const ArgName = styled.span`
  ${globalStyles}
  color: #cfcfcf;
`;

const ConstantName = styled.span`
  ${globalStyles}
  color: #36b5ff;
`;

export interface RenderSchemaProps {
  withModuleType?: boolean;
  methods?: MethodDefinition[];
  objects?: ObjectDefinition[];
  enums?: EnumDefinition[];
  onTypeNameClick?: (typeName: string) => void;
}

function RenderSchema(props: RenderSchemaProps) {
  const {
    withModuleType,
    methods,
    objects,
    enums,
    onTypeNameClick
  } = props;

  const RenderTypeName = (props: { name: string, noClick?: boolean }) => {
    const { noClick } = props;

    let name = props.name;
    let prefix: string | undefined = undefined;
    let postfix: string | undefined = undefined;

    if (name[0] === "[") {
      const count = (name.match(/\[/) || []).length;
      prefix = "[".repeat(count);
      postfix = "]".repeat(count);
      name = name.replaceAll("[", "").replaceAll("]", "");
    }

    return (
      <>
      {prefix && <SpecialChar>{prefix}</SpecialChar>}
      {onTypeNameClick && !noClick ? (
        <ClickableTypeName onClick={() => onTypeNameClick(name)}>
          {name}
        </ClickableTypeName>
      ) : (
        <TypeName>{name}</TypeName>
      )}
      {postfix && <SpecialChar>{postfix}</SpecialChar>}
      </>
    );
  };

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
    {methods?.length && methods.map((method) => (
      <>
      {withModuleType && (<>&nbsp;&nbsp;&nbsp;&nbsp;</>)}
      <PropName>{method.name}</PropName>{method.arguments?.length && (
        <>
        <SpecialChar>{"("}</SpecialChar><br/>
        {method.arguments.map((argument) => (
          <span>
          {withModuleType && (<>&nbsp;&nbsp;&nbsp;&nbsp;</>)}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <ArgName>{argument.name}</ArgName>
          <SpecialChar>{": "}</SpecialChar>
          <RenderTypeName name={argument.type} />
          {argument.required && <SpecialChar>{"!"}</SpecialChar>}
          <br/>
          </span>
        ))}
        {withModuleType && (<>&nbsp;&nbsp;&nbsp;&nbsp;</>)}
        <SpecialChar>{")"}</SpecialChar>
        </>
      )}{method.return && (
        <>
        <SpecialChar>{": "}</SpecialChar>
        <RenderTypeName name={method.return.type} />
        {method.return.required && <SpecialChar>{"!"}</SpecialChar>}
        </>
      )}
      </>
    ))}
    {withModuleType && methods?.length && (
      <>
      <br/>
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      </>
    )}
    {objects?.length && objects.map((object) => (
      <>
      <Keyword>{"type "}</Keyword>
      <TypeName>{object.type}</TypeName>
      <SpecialChar>{" {"}</SpecialChar>
      <br/>
      {object.properties?.map((property) => (
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <PropName>{property.name}</PropName>
          <SpecialChar>{": "}</SpecialChar>
          <RenderTypeName name={property.type} />
          {property.required && <SpecialChar>{"!"}</SpecialChar>}
          <br/>
        </span>
      ))}
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      </>
    ))}
    {enums?.length && enums.map((enumDef) => (
      <>
      <Keyword>{"enum "}</Keyword>
      <RenderTypeName name={enumDef.type} noClick />
      <SpecialChar>{" {"}</SpecialChar>
      <br/>
      {enumDef.constants?.map((constant) => (
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <ConstantName>{constant}</ConstantName>
          <br/>
        </span>
      ))}
      <SpecialChar>{"}"}</SpecialChar>
      <br/>
      </>
    ))}
    </>
  );
}

export default RenderSchema;
