import { useState, useCallback } from "react";
import config from "config";
import Remote from "remote/remote";

export default function useRemote(request) {
  let [remote, setRemote] = useState(Remote.initialize);

  let doRequest = useCallback((...args) => {
    setRemote(r => r.loading());

    let successHandler = handler(setRemote, 'loaded');
    // TODO: Remove this when fetcherino can handle synchronous mock validation
    let rejectionHandler = config.env.isTest ? undefined : handler(setRemote, 'rejected');

    return request(...args).then(successHandler, rejectionHandler);
  }, [setRemote, request]);

  return [remote, doRequest];
}

function handler(setRemote, handlerName) {
  return (...args) => setRemote(r => r[handlerName](...args));
}
