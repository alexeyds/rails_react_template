import expect from "test/support/remote/expect";
import routes from 'remote/resources/routes';

export function expectApiVersion(fixture=apiVersionFixture()) {
  expect.get(routes.helloWorldPath(), { 
    response: { body: fixture }
  });
}

export function apiVersionFixture({version='v1', locale='en'}={}) {
  return {
    api_version: version,
    details: 'hello',
    locale,
    user_email: 'foo@bar.com'
  };
}
