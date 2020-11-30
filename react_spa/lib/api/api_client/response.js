import { deepCamelizeKeys } from "utils/object";
import { isPlainObject } from "utils/object";
import { updateSessionFromCookie } from "current_session/session_store";
import { generalError } from "errors/messages";
import { safeParseJSON } from "utils/json";

export default function normalizeApiResponse(rawResponse) {
  if (!rawResponse.ok) updateSessionFromCookie();

  return rawResponse
    .text()
    .then(parseResponseBody)
    .then(body => buildResponse({ rawResponse, body }));
}

function buildResponse({ rawResponse, body }) {
  let success = rawResponse.ok;
  let status = rawResponse.status;

  return {
    success,
    status,
    body,
    rawResponse,
    error: success ? null : parseError({body, status})
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

function parseError({body, status}) {
  let { message, details } = extractError(body);

  return {
    message: message || generalError({explanation: `server response status was ${status}`}),
    details: details || {}
  };
}

function extractError(body) {
  if (isPlainObject(body) && isPlainObject(body.error)) {
    return body.error;
  } else {
    return {};
  }
}