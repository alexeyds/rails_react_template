import { deepCamelizeKeys, deepSnakifyKeys } from "utils/object";
import Connection from "api_client/connection";

export default new Connection(
  request => {
    request.addHeader('Content-Type', 'application/json');
    request.credentials = 'same-origin';

    if (request.body) {
      request.body = JSON.stringify(deepSnakifyKeys(request.body));
    }
  },
  response => {
    if (response.contentTypeMatches(/\bjson/)) {
      response.body = deepCamelizeKeys(JSON.parse(response.body));
    }

    if (!response.ok) {
      response.error = extractError(response);
    }
  }
);

function extractError({ status, body }) {
  if (body.error) {
    return body.error;
  } else {  
    return {
      message: `Something went wrong: server returned ${status}`,
      details: {}
    };
  }
}
