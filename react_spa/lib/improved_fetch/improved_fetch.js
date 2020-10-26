import { merge } from 'utils/object';

export function fetchJSON(path, init={}) {
  init = maybeStringifyBody(addCredentials(addContentType(init)));
  return fetch(path, init).then(parseJSONResponse);
}

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  fetchJSON[method] = function(path, init={}) { 
    return fetchJSON(path, merge(init, { method: method.toUpperCase() }));
  };
});

function addContentType(init) {
  let headers = merge(init.headers, { 'Content-Type': 'application/json' });
  return merge(init, { headers });
}

function addCredentials(init) {
  return merge(init, { credentials: 'include' });
}

function maybeStringifyBody(init) {
  let body = init.body;

  if (body) {
    return merge(init, { body: JSON.stringify(body) });
  } else {
    return init;
  }
}

function parseJSONResponse(response) {
  return response.text().then(text => {
    let { status, headers, ok } = response;
    return { status, headers, parsedBody: safeParseJSON(text), ok };
  });
}

function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
