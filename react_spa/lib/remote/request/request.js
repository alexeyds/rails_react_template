import fetchJSON from "./fetch_json";
import parseResponse from "./parse_response";
import { updateSessionFromCookie } from "sessions/session_store";

export default function request() {
  return fetchJSON(...arguments).then(parseResponse).then(maybeUpdateSession);
}

function maybeUpdateSession(response) {
  if (!response.success) updateSessionFromCookie();
  return response;
}

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  request[method] = function(path, init={}) { 
    return request(path, { ...init, method: method.toUpperCase() });
  };
});