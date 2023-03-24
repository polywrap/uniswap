import { WrapManifest } from "@polywrap/wrap-manifest-types-js";


interface NamedRoute {
  name: string;
  route: string;
}

interface TypeRefRoutes {
  functions: NamedRoute[];
  objects: NamedRoute[];
}

export function getTypeRefRoutes(
  typeName: string,
  abi: WrapManifest["abi"]
): TypeRefRoutes {
  const objects: Set<string> = new Set();
  const functions: Set<string> = new Set();

  for (const method of abi.moduleType?.methods || []) {
    if (!method.name) {
      continue;
    }

    for (const arg of method.arguments || []) {
      const argType = arg.type
        .replaceAll("[", "")
        .replaceAll("]", "");

      if (argType === typeName) {
        functions.add(method.name);
      }
    }
  }

  for (const object of abi.objectTypes || []) {
    for (const prop of object.properties || []) {
      const propType = prop.type
        .replaceAll("[", "")
        .replaceAll("]", "");

      if (propType === typeName) {
        objects.add(object.type);
      }
    }
  }

  const result: TypeRefRoutes = {
    functions: [],
    objects: [],
  };

  functions.forEach((name) => result.functions.push({
    name,
    route: "/function/" + name
  }));

  objects.forEach((name) => result.objects.push({
    name,
    route: "/object/" + name
  }));

  return result;
}
