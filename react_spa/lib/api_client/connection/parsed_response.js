export default class ParsedResponse {
  constructor({ rawResponse, body }) {
    let { ok, headers, status, statusText } = rawResponse;

    this.body = body;
    this.ok = ok;
    this.statusText = statusText;
    this.headers = headers;
    this.status = status;
    this.error = null;
  }

  contentTypeMatches(regex) {
    let contentType = this.headers.get('content-type');
    return contentType ? regex.test(contentType) : false;
  }
}
