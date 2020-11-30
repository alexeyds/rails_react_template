import { useCallback } from "react";
import useSafeSetState from "utils/hooks/use_safe_set_state";
import { initialState, loadingState, loadedState } from "promise_loader/states";

export default function usePromiseLoader(loader) {
  let [state, setState] = useSafeSetState(initialState);

  let loadPromise = useCallback(function() {
    setState(loadingState());
    return loader(...arguments).then(r => setState(loadedState(r)));
  }, [setState, loader]);

  return [state, loadPromise];
}
