let STATES = {
  initial: 'initial',
  loading: 'loading',
  loaded:  'loaded'
};

export function initialState() {
  return {
    state: STATES.initial,
    result: null,
    error: null
  };
}

export function loadingState() {
  return {
    state: STATES.loading,
    result: null,
    error: null
  };
}

export function loadedState(result) {
  return {
    state: STATES.loaded,
    result,
    error: null
  };
}

export { STATES };