const STATES = {
  initial: 'initial',
  loading: 'loading',
  loaded: 'loaded'
};

export default class RemoteLoader {
  static initial() {
    return new RemoteLoader({state: STATES.initial});
  }

  static loading() {
    return new RemoteLoader({state: STATES.loading});
  }

  static loaded(response) {
    return new RemoteLoader({state: STATES.loaded, response});
  }

  constructor({state, response=null}) {
    this.state = state;
    this.response = response;
  }

  get isLoading() {
    return this.state === STATES.loading;
  }

  get isLoaded() {
    return this.state === STATES.loaded;
  }
}

RemoteLoader.STATES = STATES;