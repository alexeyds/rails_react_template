import { capitalize } from "utils/string";

let expectationsClient = {
  expectRequest: function(path, { response={}, request }={}) {
    if (response.body) {
      response = { ...response, body: JSON.stringify(response.body) };
    }

    fetch.mock(path, { request, response });
  }
};

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  let name = `expect${capitalize(method)}`;
  expectationsClient[name] = function(path, { response, request={} }={}) {
    request = { ...request, method: method.toUpperCase() };
    return expectationsClient.expectRequest(path, { response, request });
  };
});

export default expectationsClient;
