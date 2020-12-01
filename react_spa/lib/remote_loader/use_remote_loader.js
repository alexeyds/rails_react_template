import { useCallback } from "react";
import useSafeSetState from "utils/hooks/use_safe_set_state";
import RemoteLoader from "./remote_loader";

export default function useRemoteLoader(fetchRemote) {
  let [loader, setLoader] = useSafeSetState(RemoteLoader.initial);

  let loadRemote = useCallback(function() {
    setLoader(RemoteLoader.loading());
    return fetchRemote(...arguments).then(RemoteLoader.loaded).then(setLoader);
  }, [setLoader, fetchRemote]);

  return [loader, loadRemote];
}