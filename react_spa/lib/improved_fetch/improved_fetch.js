import { merge } from 'utils/object';

export function fetchJSON(path, init={}) {
  init = maybeStringifyBody(addContentType(init));
  return fetch(path, init);
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

function maybeStringifyBody(init) {
  let body = init.body;

  if (body) {
    return merge(init, { body: JSON.stringify(body) });
  } else {
    return init;
  }
}
