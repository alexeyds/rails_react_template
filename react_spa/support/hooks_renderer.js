import { dig } from "utils/object";

export * from "@testing-library/react-hooks";

export function current(hook, prop) {
  let current = hook.result.current;
  return prop ? dig(current, prop) : current;
}

export function getState(hook) {
  return current(hook)[0];
}

export function getActions(hook) {
  return current(hook)[1];
}
