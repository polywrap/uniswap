import React from "react";
import { useParams } from "react-router-dom";
import { PolywrapProvider, usePolywrapClient } from "@polywrap/react";

import SimpleExampleRunner from "../components/SimpleExampleRunner";
import { examples } from "../constants/examples";
import { useActiveWrapper } from "../hooks/useActiveWrapper";
import SimpleExampleContainer from "../components/SimpleExampleContainer";
import ComplexExampleContainer from "../components/ComplexExampleContainer";
import { InvokeResult } from "@polywrap/client-js";

function Example() {
  const { id } = useParams<"id">();
  const wrapper = useActiveWrapper();

  const example = examples[wrapper].find((e) => id === e.name);

  if (!example || !id) {
    return <div>Unknown Example ID: {id}</div>;
  }

  if (example.type === "simple") {
    return <SimpleExampleContainer id={id} example={example}/>;
  } else {
    return <ComplexExampleContainer id={id} example={example}/>;
  }
}

export default Example;
