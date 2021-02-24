export default class RequestBuilder {
  constructor(url, options) {
    this.url = url;

    for (let k in options) {
      this[k] = options[k];
    }
  }

  addHeaders(headers) {
    this.headers = { ...this.headers, ...headers };
  }

  addHeader(name, value) {
    this.addHeaders({ [name]: value });
  }

  get options() {
    let result = {};

    for (let k in this) {
      if (k === 'url') continue;
      result[k] = this[k];
    }

    return result;
  }
}
