export default function expect(path, { response={}, request }={}) {
  if (response.body) {
    response = { ...response, body: JSON.stringify(response.body) };
  }

  fetch.mock(path, { request, response });
}

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  expect[method] = function(path, { response, request={} }={}) {
    request = { ...request, method: method.toUpperCase() };
    return expect(path, { response, request });
  };
});
