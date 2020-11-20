import { deepCamelizeKeys } from "utils/object";
import { safeParseJSON } from "utils/json";

export async function parseJSON(fetchedResponse) {
  let body = await fetchedResponse.text().then(parseResponseBody);
  return buildResponse({ fetchedResponse, body });
}

function buildResponse({ fetchedResponse, body }) {
  return {
    success: fetchedResponse.ok,
    status: fetchedResponse.status,
    body,
    fetchedResponse
  };
}

function parseResponseBody(body) {
  let result = safeParseJSON(body);

  if (result.success) {
    return deepCamelizeKeys(result.value);
  } else {
    return result.value;
  }
}
