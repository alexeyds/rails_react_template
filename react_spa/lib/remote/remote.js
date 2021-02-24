import { capitalize } from "utils/string";
import { fromFlatArray } from "utils/object";

export default class Remote {
  static STATES = fromFlatArray(['initial', 'loading', 'success', 'failure']);

  static initialize() {
    return new Remote({ state: Remote.STATES.initial });
  }

  constructor({state, response=null, rejection=null, lastOkResponse=null}) {
    this.state = state;
    this.response = response;
    this.rejection = rejection;
    this.lastOkResponse = lastOkResponse;
  }

  loading() {
    return this._nextState(Remote.STATES.loading);
  }

  rejected(rejection) {
    return this._nextState(Remote.STATES.failure, { rejection });
  }

  loaded(response) {
    if (response.ok) {
      return this._nextState(Remote.STATES.success, { response, lastOkResponse: response });
    } else {
      return this._nextState(Remote.STATES.failure, { response });
    }
  }

  _nextState(state, opts) {
    return new Remote({ state, lastOkResponse: this.lastOkResponse, ...opts });
  }
}

for (let stateName in Remote.STATES) {
  let get = function() { return this.state == Remote.STATES[stateName]; };
  Object.defineProperty(Remote.prototype, `is${capitalize(stateName)}`, { get });
}
