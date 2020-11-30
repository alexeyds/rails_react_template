import config from "config";
import fetchJSON from "./fetch_json";
import { updateSessionFromCookie } from "current_session/session_store";
import Response from "remote/response";

export default function request() {
  let errorHandler = config.env.isTest ? undefined : Response.fromError;
  return fetchJSON(...arguments).then(handleServerResponse, errorHandler);
}

function handleServerResponse(response) {
  if (!response.ok) updateSessionFromCookie();

  return Response.fromFetchResponse(response);
}

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  request[method] = function(path, init={}) { 
    return request(path, { ...init, method: method.toUpperCase() });
  };
});