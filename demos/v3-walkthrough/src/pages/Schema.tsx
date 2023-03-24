import React from "react";
import { usePolywrapClient } from "@polywrap/react";
import { renderSchema } from "@polywrap/schema-compose";
import SyntaxHighlighter from "react-syntax-highlighter";

import { uniswapV3Uri } from "../constants";
import { useWrapManifest } from "../hooks/useWrapManifest";
import Loader from "../components/Loader";

function Schema() {
  const client = usePolywrapClient();
  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: uniswapV3Uri
  });
  const [schema, setSchema] = React.useState<
    string | undefined
  >(undefined);

  React.useEffect(() => {
    if (loading) {
      setSchema(undefined);
    } else if (manifest && !schema) {
      setSchema(renderSchema(manifest.abi, false));
    }
  }, [loading]);

  if (loading) {
    return (
      <Loader />
    );
  } else if (error || !manifest) {
    console.error(error);
    return (
      <div>
        Failed to fetch manifest.
      </div>
    );
  }

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
