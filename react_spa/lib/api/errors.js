import { isPlainObject } from "utils/object";
import { generalError } from "errors/messages";

export function extractResponseError(response) {
  if (response.success) {
    return null;
  } else {
    return extractErrorFromBody(response.body) || generalError;
  }
}

function extractErrorFromBody(body) {
  if (isPlainObject(body)) {
    return body.error?.message;
  } else {
    return null;
  }
}
