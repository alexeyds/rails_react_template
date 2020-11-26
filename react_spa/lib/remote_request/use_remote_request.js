import { useCallback } from "react";
import useSafeSetState from "utils/hooks/use_safe_set_state";
import { initialState, loadingState, loadedState, erroredState } from "remote_request/states";

export default function useRemoteRequest(request) {
  let [state, setState] = useSafeSetState(initialState);

  let executeRequest = useCallback(function() {
    setState(loadingState());
    return stateFromRequestPromise(request(...arguments)).then(setState);
  }, [setState, request]);

  return [state, executeRequest];
}

function stateFromRequestPromise(promise) {
  return promise.then(
    response => loadedState({response}),
    error => erroredState({error})
  );
}
