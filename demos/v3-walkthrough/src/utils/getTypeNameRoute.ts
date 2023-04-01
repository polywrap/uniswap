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
    ...abi.importedObjectTypes?.map((x) => ({
      name: x.type,
      route: `/import/object/${x.type}`
    })) || [],
    ...abi.importedEnumTypes?.map((x) => ({
      name: x.type,
      route: `/import/enum/${x.type}`
    })) || [],
    ...abi.importedModuleTypes?.map((x) => ({
      name: x.type,
      route: `/import/module/${x.type}`
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
