import { useEffect } from "react";
import { useSessionStore } from "sessions/session_store";
import useRemote from "remote/use_remote";

export default function useAPIRemote(...args) {
  let [remote, doRequest] = useRemote(...args);
  let { response } = remote;
  let clearSession = useSessionStore(s => s.clearSession);

  useEffect(() => {
    if (response && response.status === 401) clearSession();
  }, [response, clearSession]);

  return [remote, doRequest];
}
