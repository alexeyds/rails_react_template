import { safeParseJSON } from "utils/json";
import { deepCamelizeKeys, isPlainObject } from "utils/object";

export default function parseResponse(response) {
  return response.text().then(rawBody => {
    return {
      success: response.ok,
      status: response.status,
      body: parseBody(rawBody)
    };
  }); 
}

function parseBody(rawBody) {
  let body = safeParseJSON(rawBody).value;
  return isPlainObject(body) ? deepCamelizeKeys(body) : body;
}