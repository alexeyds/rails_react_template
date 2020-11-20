import { deepCamelizeKeys } from "utils/object";

export async function parseJSON(fetchedResponse) {
  let body = await fetchedResponse.text().then(safeParseJSON);
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

function safeParseJSON(text) {
  try {
    return deepCamelizeKeys(JSON.parse(text));
  } catch {
    return text;
  }
}
