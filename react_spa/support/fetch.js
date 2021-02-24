import conn from "api_client/json_connection";
import { deepMerge } from "utils/object";

export function fetchResponse(response) {
  fetch.mock('/fetch-response', { response });
  return fetch('/fetch-response');
}

export function expectJSON(path, { request, response }={}) {
  response = deepMerge(response, { 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response?.body)
  });

  fetch.mock(path, { request, response });
}

export function fetchAPIResponse(response) {
  response = { body: {}, ...response };
  expectJSON('/fetch-json-response', { response });
  return conn.get('/fetch-json-response');
}

export * from "support/api/error_responses";
