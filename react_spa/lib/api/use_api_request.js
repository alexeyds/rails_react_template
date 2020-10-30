import { useState, useCallback } from 'react';
import useMountedState from "utils/hooks/use_mounted_state";

export default function useAPIRequest(requestFunction) {
  let [requestState, setState] = useState(loadingState());
  let mountedState = useMountedState();

  let maybeSetState = useCallback(state => {
    mountedState.isMounted() && setState(state);
  }, [setState, mountedState]);

  let executeRequest = useCallback(function() {
    maybeSetState(loadingState());
    stateFromRequestPromise(requestFunction(...arguments)).then(maybeSetState);
  }, [requestFunction, maybeSetState]);

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
