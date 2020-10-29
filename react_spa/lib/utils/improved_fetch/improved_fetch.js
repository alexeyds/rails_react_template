export function fetchJSON(path, init={}) {
  init = maybeStringifyBody(addContentType(init));
  return fetch(path, init);
}

function addContentType(init) {
  let headers = { ...init.headers, 'Content-Type': 'application/json' };
  return { ...init, headers };
}

function maybeStringifyBody(init) {
  let body = init.body;

  if (body) {
    return  { ...init, body: JSON.stringify(body) };
  } else {
    return init;
  }
}
