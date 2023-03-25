export function trimPropType(type: string) {
  return type
    .replaceAll("[", "")
    .replaceAll("]", "");
}
