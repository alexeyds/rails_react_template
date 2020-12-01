import fetchJSON from "./fetch_json";
import { updateSessionFromCookie } from "current_session/session_store";

export default function request() {
  return fetchJSON(...arguments).then(r => {
    if (!r.ok) updateSessionFromCookie();
    return r;
  });
}

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  request[method] = function(path, init={}) { 
    return request(path, { ...init, method: method.toUpperCase() });
  };
});