import mockRoute from "./mock_route";
import { deepSnakifyKeys, deepCamelizeKeys } from "utils/object";
import * as errors from "support/api/error_responses";

export default function expectation({method, fixture, route}) {
  function expect({ response=fixture(), body, status=200 }={}) {
    let request = { method };
    if (body) request.body = deepSnakifyKeys(body);
    mockRoute(route, { request, response: { body: response, status } });

    return deepCamelizeKeys(response);
  }

  for (let errorName in errors) {
    expect[errorName] = (...args) => {
      let { body, status } = errors[errorName](...args);
      return expect({ response: body, status });
    };
  }

  return expect;
}

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  expectation[method] = function(route, fixture) { 
    return expectation({ route, fixture, method: method.toUpperCase() });
  };
});
