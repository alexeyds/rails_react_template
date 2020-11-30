import { isPlainObject } from "utils/object";
import { generalError } from "errors/messages";

export function parseServerError({body, status}) {
  let message, details;

  if (isPlainObject(body) && isPlainObject(body.error)) {
    message = body.error.message;
    details = body.error.details;
  }

  return { 
    message: message || defaultMessage(status),
    details: details || {} 
  };
}

function defaultMessage(status) {
  return generalError({explanation: `${status} ответ сервера`});
}

export function parseFetchError(error) {
  let explanation = error?.message || `${error}`;
  return {
    message: generalError({explanation}),
    details: {}
  };
}