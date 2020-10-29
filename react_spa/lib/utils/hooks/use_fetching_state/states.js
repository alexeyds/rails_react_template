export function loadingState() {
  return state({
    isLoading: true,
    success: false
  });
}

export function loadedState({response, parsedBody}) {
  return state({
    isLoading: false,
    success: true,
    parsedBody,
    response
  });
}

export function erroredState({error, response=null, parsedBody=null}) {
  return state({
    isLoading: false,
    success: false,
    parsedBody,
    response,
    error
  });
}

function state({isLoading, success, parsedBody=null, response=null, error=null}) {
  return { isLoading, success, parsedBody, response, error };
}
