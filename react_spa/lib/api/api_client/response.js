import { deepCamelizeKeys } from "utils/object";
import { updateSessionFromCookie } from "current_session/session_store";
import { safeParseJSON } from "utils/json";

export async function parseJSON(fetchedResponse) {
  if (!fetchedResponse.ok) updateSessionFromCookie();
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
