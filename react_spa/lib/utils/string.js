export { default as camelize } from "lodash.camelcase";

export function capitalize(string) {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
}
