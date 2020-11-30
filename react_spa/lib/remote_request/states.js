let STATES = {
  initial: 'initial',
  loading: 'loading',
  loaded:  'loaded'
};

export function initialState() {
  return {
    state: STATES.initial,
    response: null,
    error: null
  };
}

export function loadingState() {
  return {
    state: STATES.loading,
    response: null,
    error: null
  };
}

export function loadedState({ response }) {
  return {
    state: STATES.loaded,
    response,
    error: null
  };
}

export { STATES };