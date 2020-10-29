let Response = {};

function parseJSON(response) {
  return response.text().then(safeParseJSON);
}

Response.parseJSON = parseJSON;

export default Response;

function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
