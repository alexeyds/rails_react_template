import { useState, useMemo } from 'react';
import { loadingState, loadedState, erroredState } from './states';
import useMountedState from "utils/hooks/use_mounted_state";

export default function useFetchingState() {
  let [state, setState] = useState(loadingState);
  let mountedState = useMountedState();

  let actions = useMemo(
    () => buildActions({setState, mountedState}),
    [setState, mountedState]
  );

  return [state, actions];  
}

function buildActions({setState, mountedState}) {
  return {
    startRequest: async function(promise, options) {
      let state = await stateFromRequestPromise(promise, options);
      if (mountedState.isMounted()) setState(state);
    } 
  };
}

function stateFromRequestPromise(promise, options={}) {
  let bodyParser = options.bodyParser || parseAsText;

  return promise.then(
    r => stateFromResponse(r, { bodyParser }),
    e => stateFromError(e)
  );
}

async function stateFromResponse(response, { bodyParser }) {
  let parsedBody = await bodyParser(response);

  if (response.ok) {
    return loadedState({response, parsedBody});
  } else {
    let error = new Error(`${response.status} ${response.statusText}`);
    return erroredState({error, response, parsedBody});
  }
}

function stateFromError(error) {
  return erroredState({error});
}

function parseAsText(response) {
  return response.text();
}
