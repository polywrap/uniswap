import { BuilderConfig } from "@polywrap/client-js";
import { createPolywrapProvider } from "@polywrap/react";

const CustomProvider = createPolywrapProvider("custom");

export const CustomPolywrapProvider = ({
  children,
  envs,
  interfaces,
  packages,
  redirects,
  resolvers,
  wrappers,
}: {
  children: JSX.Element;
} & BuilderConfig) => {
  return (
    <CustomProvider
      envs={envs}
      interfaces={interfaces}
      packages={packages}
      redirects={redirects}
      resolvers={resolvers}
      wrappers={wrappers}
    >
      {children}
    </CustomProvider>
  );
};
