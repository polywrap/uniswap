import React from "react";
import { usePolywrapClient } from "@polywrap/react";
import { renderSchema } from "@polywrap/schema-compose";
import SyntaxHighlighter from "react-syntax-highlighter";

import { uniswapV3Uri } from "../constants";

function Schema() {
  const client = usePolywrapClient();
  const [schema, setSchema] = React.useState<
    string | undefined
  >(undefined);

  React.useEffect(() => {
    const fetchManifest = async () => {
      const manifest = await client.getManifest(uniswapV3Uri);
      if (!manifest.ok) {
        console.error(
          "Failed to fetch manifest from " + uniswapV3Uri +
          "\nError: " + manifest.error
        );
        return;
      }

      // Remove the `@imports` directive, it's ugly
      if (manifest.value.abi.moduleType)
        manifest.value.abi.moduleType.imports = [];

      setSchema(renderSchema(manifest.value.abi, false));
    }

    fetchManifest();
  }, []);

  return (
    <>
    {schema &&
      <SyntaxHighlighter
        language="graphql"
        customStyle={{
          backgroundColor: "black",
          color: "white"
        }}
      >
        {schema}
      </SyntaxHighlighter>
    }
    </>
  );
}

export default Schema;
