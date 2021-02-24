import { dig } from "utils/object";

export function errorMessage(remote) {
  if (remote.isFailure) {
    let { rejection, response } = remote;

    return rejection ? rejectionError(rejection) : response.error.message;
  } else {
    return null;
  }
}

function rejectionError(rejection) {
  return `Something went wrong (${rejection.message}).`;
}

export function fieldError(remote, field) {
  let { response } = remote;

  if (remote.isFailure && response) {
    return dig(response.error, `details.${field}[0]`) || null;
  } else {
    return null;
  }
}
