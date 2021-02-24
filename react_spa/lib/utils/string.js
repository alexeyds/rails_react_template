export { default as camelize } from "lodash/camelCase";
export { default as snakeCase } from "lodash/snakeCase";

export function capitalize(string) {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
}
