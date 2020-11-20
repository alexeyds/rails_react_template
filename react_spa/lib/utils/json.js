export function safeParseJSON(json) {
  try {
    return {
      success: true,
      value: JSON.parse(json)
    };
  } catch {
    return {
      success: false,
      value: json
    };
  }
}