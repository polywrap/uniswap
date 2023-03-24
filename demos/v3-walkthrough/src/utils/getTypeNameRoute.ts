import { WrapManifest } from "@polywrap/wrap-manifest-types-js";

export function getTypeNameRoute(
  typeName: string,
  abi: WrapManifest["abi"]
): string | undefined {
  const namedRoutes: {
    name: string;
    route: string;
  }[] = [
    ...abi.objectTypes?.map((x) => ({
      name: x.type,
      route: `/object/${x.type}`
    })) || [],
    ...abi.enumTypes?.map((x) => ({
      name: x.type,
      route: `/enum/${x.type}`
    })) || [],
    {
      name: "Env",
      route: "/env"
    }
  ];

  const namedRoute = namedRoutes.find(
    (x) => x.name === typeName
  );

  return namedRoute?.route;
}
