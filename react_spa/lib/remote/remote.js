import { fromFlatArray } from "utils/object";
import RemoteError from "remote/remote_error";

export default class Remote {
  static STATES = fromFlatArray([
    'initial',
    'loading',
    'success',
    'failed'
  ]);

  static initial() {
    return new Remote({state: Remote.STATES.initial});
  }

  static loading() {
    return new Remote({state: Remote.STATES.loading});
  }

  static rejected(rejection) {
    return new Remote({state: Remote.STATES.failed, error: RemoteError.fromRejection(rejection)});
  }

  static loaded(response) {
    if (response.success) {
      return new Remote({state: Remote.STATES.success, response});
    } else {
      return new Remote({state: Remote.STATES.failed, response, error: RemoteError.fromResponse(response)});
    }
  }

  constructor({state, response=null, error=null}) {
    this.state = state;
    this.response = response;
    this.error = error;
  }
}
