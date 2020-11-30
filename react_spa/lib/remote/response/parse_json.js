import { deepCamelizeKeys } from "utils/object";
import { safeParseJSON } from "utils/json";

export default function parseJSON(response) {
  return response.text().then(bodyFromJSON);
}

function bodyFromJSON(json) {
  let result = safeParseJSON(json);

  if (result.success) {
    return deepCamelizeKeys(result.value);
  } else {
    return result.value;
  }
}