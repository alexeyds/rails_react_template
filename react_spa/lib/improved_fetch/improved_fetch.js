export function fetchJSON(path, init={}) {
  init = maybeStringifyBody(addCredentials(addContentType(init)));
  return fetch(path, init).then(parseJSONResponse);
}

function addContentType(init) {
  let headers = init.headers || {};
  headers = Object.assign({}, headers, { 'Content-Type': 'application/json' });

  return Object.assign({}, init, { headers });
}

function addCredentials(init) {
  return Object.assign({}, init, { credentials: 'include' });
}

function maybeStringifyBody(init) {
  let body = init.body;

  if (body) {
    return Object.assign({}, init, { body: JSON.stringify(body) });
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
