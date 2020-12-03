import { useState, useCallback } from "react";
import config from "config";
import Remote from "./remote";

// TODO: Remove this when fetcherino can handle synchronous mock validation
let rejectionHandler = config.env.isTest ? undefined : Remote.rejected;

export default function useRemote(request) {
  let [remote, setRemote] = useState(Remote.initial);

  let doRequest = useCallback(function() {
    setRemote(Remote.loading());
    return request(...arguments).then(Remote.loaded, rejectionHandler).then(setRemote);
  }, [setRemote, request]);

  return [remote, doRequest];
}
