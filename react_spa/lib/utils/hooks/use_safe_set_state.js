import { useState, useCallback } from "react";
import useMountedState from "utils/hooks/use_mounted_state";

export default function useSafeSetState() {
  let [state, setState] = useState(...arguments);
  let mountedState = useMountedState();

  let maybeSetState = useCallback(function maybeSetState() {
    if (mountedState.isMounted()) setState(...arguments);
  }, [mountedState, setState]);

  return [state, maybeSetState];
}