import { safeParseJSON } from "utils/json";
import { deepCamelizeKeys, isPlainObject, dig } from "utils/object";

const STATES = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failed: 'failed',
  rejected: 'rejected'
};

export default class Response {
  static initial() {
    return new Response({ state: STATES.initial });
  }

  static loading() {
    return new Response({ state: STATES.loading });
  }

  static rejected(rejection) {
    return new Response({ state: Response.STATES.rejected, rejection });
  }

  static async fromFetchResponse(rawResponse) {
    let parsedBody = await rawResponse.text().then(safeParseJSON);
    let state = rawResponse.ok ? STATES.success : STATES.failed;

    return new Response({ state, rawResponse, body: parsedBody.value });
  }

  constructor({state, body=null, rawResponse=null, rejection=null}) {
    this.state = state;
    this.body = isPlainObject(body) ? deepCamelizeKeys(body) : body;
    this.rawResponse = rawResponse;
    this.rejection = rejection;
  }

  get isLoading() {
    return this.state === STATES.loading;
  }

  get isSuccess() {
    return this.state === STATES.success;
  }

  get isErrored() {
    return this.state === STATES.rejected || this.state === STATES.failed;
  }

  get errorMessage() {
    if (this.state === STATES.failed) {
      return dig(this.body, 'error.message', `Something went wrong (server returned ${this.rawResponse.status}).`);
    } else if (this.state === STATES.rejected) {
      return `Something went wrong (${this.rejection.message})`;
    } else {
      return null;
    }
  }

  get errorDetails() {
    if (this.state === STATES.failed) {
      return dig(this.body, 'error.details', {});
    } else {
      return {};
    }
  }
}

Response.STATES = STATES;