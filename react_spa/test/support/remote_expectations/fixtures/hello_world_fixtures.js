export function apiVersion({version='v1', locale='en'}={}) {
  return {
    api_version: version,
    details: 'hello',
    locale
  };
}
