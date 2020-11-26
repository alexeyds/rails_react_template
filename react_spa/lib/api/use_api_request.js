import { useCallback } from 'react';
import useSafeSetState from "utils/hooks/use_safe_set_state";

export default function useAPIRequest(requestFunction) {
  let [requestState, setState] = useSafeSetState(loadingState());

  let executeRequest = useCallback(function() {
    setState(loadingState());
    return stateFromRequestPromise(requestFunction(...arguments)).then(setState);
  }, [requestFunction, setState]);

  return [requestState, executeRequest];
}

function stateFromRequestPromise(promise) {
  return promise.then(
    response => loadedState({response}),
    error => erroredState({error})
  );
}

function loadingState() {
  return {
    isLoading: true,
    response: null,
    error: null
  };
}

function loadedState({response}) {
  return {
    isLoading: false,
    response,
    error: null
  };
}

function erroredState({error}) {
  return {
    isLoading: false,
    response: null,
    error
  };
}
