import { safeParseJSON } from "utils/json";

export function retrieveObject(key) {
  let result = safeParseJSON(localStorage.getItem(key));
  return result.success ? result.value : null;
}

export function storeObject(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
  return object;
}

export function remove(key) {
  localStorage.removeItem(key);
  return null;
}
