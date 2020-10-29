export default {
  parseJSON: (response) => {
    return response.text().then(safeParseJSON);
  }
};

function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
