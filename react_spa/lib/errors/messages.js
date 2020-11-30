export function generalError({explanation=null}={}) {
  let errorDescription = getErrorDescriptionFrom(explanation);
  return `Something went wrong${errorDescription}.`;
}

function getErrorDescriptionFrom(str) {
  if (str) {
    return ` (${str})`;
  } else {
    return '';
  }
}