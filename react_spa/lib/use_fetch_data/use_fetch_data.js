import { useState, useMemo, useEffect, useRef } from 'react';

const HOOK_STATES = { mounted: 'mounted', unmounted: 'unmounted' };

export default function useFetchData() {
  let [data, setData] = useState(loadingState);

  let hookState = useRef(HOOK_STATES.mounted);
  useEffect(() => {
    return () => hookState.current = HOOK_STATES.unmounted;
  }, []);

  let actions = useMemo(() => {
    return { handleRequestPromise: buildRequestPromiseHandler({hookState, setData}) };
  }, [setData]);

  return [data, actions];  
}

function buildRequestPromiseHandler({hookState, setData}) {
  return function(promise, options={}) {
    let bodyParser = options.bodyParser || parseAsText;

    stateFromRequestPromise(promise, { bodyParser }).then(state => {
      if (hookState.current === HOOK_STATES.mounted) {
        setData(state);
      }
    });
  };
}

function stateFromRequestPromise(promise, { bodyParser }) {
  return promise.then(
    r => stateFromResponse(r, { bodyParser }),
    e => stateFromError(e)
  );
}

function stateFromResponse(response, { bodyParser }) {
  return bodyParser(response).then(parsedBody => {
    if (response.ok) {
      return loadedState({response, parsedBody});
    } else {
      let error = new Error(`${response.status} ${response.statusText}`);
      return erroredState({error, response, parsedBody});
    }
  });
}

function stateFromError(error) {
  return erroredState({error});
}

function loadingState() {
  return state({
    isLoading: true,
    success: false
  });
}

function loadedState({response, parsedBody}) {
  return state({
    isLoading: false,
    success: true,
    parsedBody,
    response
  });
}

function erroredState({error, response=null, parsedBody=null}) {
  return state({
    isLoading: false,
    success: false,
    parsedBody,
    response,
    error
  });
}

function state({isLoading, success, parsedBody=null, response=null, error=null}) {
  return { isLoading, success, parsedBody, response, error };
}

function parseAsText(response) {
  return response.text();
}
