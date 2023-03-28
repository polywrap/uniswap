import { InvokeLanguage } from "./InvokeLanguage";

export function getInvokeSnippet(
  uri: string,
  namespace: string,
  method: string,
  args: Record<string, unknown>,
  language: InvokeLanguage,
  expandArgs: boolean,
  codegen: boolean
) {
  let argsString = "{...}";

  if (expandArgs) {
    switch (language) {
      case "TypeScript":
        if (codegen) {
          argsString = JSON.stringify(args, null, 2)
            .replace(/"([^"]+)":/g, "$1:");
        } else {
          argsString = JSON.stringify(args, null, 2)
            .replaceAll("\n", "\n  ")
            .replace(/"([^"]+)":/g, "$1:");
        }
        break;
      case "Python":
        if (codegen) {
          argsString = JSON.stringify(args, null, 2)
            .replaceAll(": ", "=")
            .replace(/"([^"]+)"=/g, "$1=")
            .replace("{\n  ", "");
          argsString = argsString
            .substring(0, argsString.lastIndexOf("}") - 1);
        } else {
          argsString = JSON.stringify(args, null, 2)
            .replaceAll("\n", "\n  ");
        }
        break;
      case "Rust":
        argsString = JSON.stringify(args, null, 4)
          .replaceAll("\n", "\n    ");
        break;
      default:
        argsString = "{...}";
    }
  }

  if (codegen) {
    switch (language) {
      case 'TypeScript':
        return `await ${namespace}.${method}(${argsString});`;
      case 'Python':
        return `await ${namespace}.${method}(
  ${argsString}
)`;
      case 'Rust':
        return `client.invoke(
    &Uri::from("${uri}"),
    "${method}",
    wrap::args!(${argsString})
).await.unwrap();`;
      default:
        return '';
    }
  } else {
    switch (language) {
      case 'TypeScript':
        return `await client.invoke({
  uri: "${uri}",
  method: "${method}",
  args: ${argsString}
});`;
      case 'Python':
        return `await client.invoke(
  uri=Uri("${uri}"),
  method="${method}",
  args=${argsString}
)`;
      case 'Rust':
        return `client.invoke(
    &Uri::from("${uri}"),
    "${method}",
    wrap::args!(${argsString})
).await.unwrap();`;
      default:
        return '';
    }
  }
}
