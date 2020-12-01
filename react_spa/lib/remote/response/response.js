import { deepCamelizeKeys, isPlainObject, dig } from "utils/object";
import { safeParseJSON } from "utils/json";

export default class Response {
  static async fromFetchResponse(rawResponse) {
    let parsedBody = await rawResponse.text().then(safeParseJSON);
    let { status, ok: success } = rawResponse;

    return new Response({ success, status, body: parsedBody.value, rawResponse });
  }
  
  static fromError(error) {
    return new Response({ success: false, error, body: null, rawResponse: null, status: null });
  }

  constructor({success, status, body, rawResponse, error=null}) {
    this.success = success;
    this.status = status;
    this.body = isPlainObject(body) ? deepCamelizeKeys(body) : body;
    this.rawResponse = rawResponse;
    this.error = error;
  }

  get errorMessage() {
    if (this.success) {
      return null;
    } else if (this.error) {
      return `Something went wrong (${this.error.message})`;
    } else {
      return dig(this.body, 'error.message', `Something went wrong (server returned ${this.status}).`);
    }
  }

  get errorDetails() {
    return dig(this.body, 'error.details', {});
  }
}