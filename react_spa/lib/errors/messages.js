export function generalError({explanation=null}={}) {
  let errorDescription = getErrorDescriptionFrom(explanation);
  return `Something went wrong${errorDescription}. Please try again or contact support.`;
}

function getErrorDescriptionFrom(str) {
  if (str) {
    return ` (${str})`;
  } else {
    return '';
  }
}