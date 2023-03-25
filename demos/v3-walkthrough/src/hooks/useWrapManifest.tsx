import React from "react";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { usePolywrapClient } from "@polywrap/react";
import { PolywrapClient, WrapError } from "@polywrap/client-js";

import { useStateReducer } from "./useStateReducer";

export interface UseWrapManifestState {
  manifest?: WrapManifest;
  error?: WrapError;
  loading: boolean;
}

export const INITIAL_INVOKE_STATE: UseWrapManifestState = {
  manifest: undefined,
  error: undefined,
  loading: true,
};

export interface UseWrapManifestProps {
  client: PolywrapClient;
  uri: string;
}

export function useWrapManifest(
  props: UseWrapManifestProps
): UseWrapManifestState {
  const client = props.client;

  // Initialize the UseWrapManifestState
  const { state, dispatch } = useStateReducer<UseWrapManifestState>(
    INITIAL_INVOKE_STATE
  );

  React.useEffect(() => {
    const execute = async () => {
      dispatch({ loading: true });
      const result = await client.getManifest(props.uri);
  
      if (result.ok) {
        dispatch({ manifest: result.value, loading: false });
      } else {
        dispatch({ error: result.error, loading: false });
      }
      return result;
    };

    execute();
  }, []);

  return state;
}
