import { updateSessionFromCookie } from "current_session/session_store";
import { parseServerError, parseFetchError } from "./error_parsers";
import { parseJSON } from "./body_parsers";

export async function handleServerResponse(rawResponse) {
  if (!rawResponse.ok) updateSessionFromCookie();

  let body = await parseJSON(rawResponse);
  let { status, ok: success } = rawResponse;

  return {
    success,
    status,
    body,
    rawResponse,
    error: success ? null : parseServerError({body, status})
  };
}

export function handleFetchError(error) {
  return {
    success: false,
    status: null,
    body: null,
    rawResponse: null,
    error: parseFetchError(error)
  };
}
