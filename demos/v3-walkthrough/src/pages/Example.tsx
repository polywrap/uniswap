import React from "react";
import { useParams } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";

import ExampleRunner from "../components/ExampleRunner";
import { examples } from "../constants/examples";
import { useActiveWrapper } from "../hooks/useActiveWrapper";

function Example() {
  const client = usePolywrapClient();
  const { id } = useParams<"id">();
  const wrapper = useActiveWrapper();

  const example = examples[wrapper].find((e) => 
    id === e.name
  );

  if (!example || !id) {
    return (
      <div>
        Unknown Example ID: {id}
      </div>
    );
  }

  return (
    <ExampleRunner id={id} example={example} client={client} />
  );
}

export default Example;
