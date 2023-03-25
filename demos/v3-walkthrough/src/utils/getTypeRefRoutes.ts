import { WrapManifest } from "@polywrap/wrap-manifest-types-js";

import { trimPropType } from "./trimPropType";

export interface NamedRoute {
  name: string;
  route: string;
}

export interface TypeRefRoutes {
  functionArgs: NamedRoute[];
  functionRets: NamedRoute[];
  objects: NamedRoute[];
}

export function getTypeRefRoutes(
  typeName: string,
  abi: WrapManifest["abi"]
): TypeRefRoutes {
  const objects: Set<string> = new Set();
  const functionArgs: Set<string> = new Set();
  const functionRets: Set<string> = new Set();

  for (const method of abi.moduleType?.methods || []) {
    if (!method.name) {
      continue;
    }

    for (const arg of method.arguments || []) {
      const argType = trimPropType(arg.type);
      if (argType === typeName) {
        functionArgs.add(method.name);
      }
    }

    if (method.return) {
      const retType = trimPropType(method.return.type);
      if (retType === typeName) {
        functionRets.add(method.name);
      }
    }
  }

  for (const object of abi.objectTypes || []) {
    for (const prop of object.properties || []) {
      const propType = trimPropType(prop.type);

      if (propType === typeName) {
        objects.add(object.type);
      }
    }
  }

  const result: TypeRefRoutes = {
    functionArgs: [],
    functionRets: [],
    objects: [],
  };

  functionArgs.forEach((name) => result.functionArgs.push({
    name,
    route: "/function/" + name
  }));

  functionRets.forEach((name) => result.functionRets.push({
    name,
    route: "/function/" + name
  }));

  objects.forEach((name) => result.objects.push({
    name,
    route: "/object/" + name
  }));

  return result;
}
