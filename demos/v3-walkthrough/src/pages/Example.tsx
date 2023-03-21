import React from "react";
import { useParams } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";

import ExampleRunner from "../components/ExampleRunner";
import { examples } from "../constants/examples";

function Example() {
  const client = usePolywrapClient();
  const { id } = useParams<"id">();

  const example = examples.find((e) => 
    id === e.name.toLowerCase().replaceAll(" ", "-")
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
