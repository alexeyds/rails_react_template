import parseJSON from "./parse_json";

export default class Response {
  static async fromFetchResponse(rawResponse) {
    let body = await parseJSON(rawResponse);
    let { status, ok: success } = rawResponse;

    return new Response({ success, status, body, rawResponse });
  }
  
  static fromError(error) {
    return new Response({ success: false, error, body: null, rawResponse: null, status: null });
  }

  constructor({success, status, body, rawResponse, error=null}) {
    this.success = success;
    this.status = status;
    this.body = body;
    this.rawResponse = rawResponse;
    this.error = error;
  }
}