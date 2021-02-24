import ParsedResponse from "./parsed_response";
import RequestBuilder from "./request_builder";

export default class Connection {
  constructor(buildRequest, parseResponse) {
    this._buildRequest = buildRequest;
    this._parseResponse = parseResponse;
  }

  get(path, options) {
    return this.request(path, { ...options, method: "GET" });
  }

  post(path, options) {
    return this.request(path, { ...options, method: "POST" });
  }

  put(path, options) {
    return this.request(path, { ...options, method: "PUT" });
  }

  patch(path, options) {
    return this.request(path, { ...options, method: "PATCH" });
  }

  delete(path, options) {
    return this.request(path, { ...options, method: "DELETE" });
  }

  request() {
    return this.rawRequest(...arguments).then(constructResponse).then(response => {
      this._parseResponse && this._parseResponse(response);
      return response;
    });
  }

  rawRequest(path, opts) {
    let requestBuilder = new RequestBuilder(path, opts);
    this._buildRequest && this._buildRequest(requestBuilder);

    return fetch(requestBuilder.url, requestBuilder.options);
  }
}

function constructResponse(rawResponse) {
  return rawResponse.text().then(text => new ParsedResponse({ rawResponse, body: text }));
}
