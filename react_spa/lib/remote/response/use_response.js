import config from "config";
import { useCallback } from "react";
import useSafeSetState from "utils/hooks/use_safe_set_state";
import Response from "./response";

export default function useResponse(request) {
  let [response, setResponse] = useSafeSetState(Response.initial);

  let doRequest = useCallback(function() {
    setResponse(Response.loading());

    // TODO: Remove this when fetcherino can handle synchronous mock validation
    let handleRejection = config.env.isTest ? undefined : Response.rejected;

    return request(...arguments).then(Response.fromFetchResponse, handleRejection).then(setResponse);
  }, [setResponse, request]);

  return [response, doRequest];
}