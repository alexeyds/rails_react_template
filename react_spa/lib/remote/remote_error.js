import { dig } from "utils/object";

function fromRejection(rejection) {
  return { message: defaultErrorMessage(rejection.message), details: {} };
}

function fromResponse(response) {
  let message = dig(response.body, 'error.message') || defaultErrorMessage(`server returned ${response.status}`);
  let details = dig(response.body, 'error.details') || {};

  return { message, details };
}

function defaultErrorMessage(explanation) {
  return `Something went wrong (${explanation})`;
}

export default {
  fromRejection,
  fromResponse
};
