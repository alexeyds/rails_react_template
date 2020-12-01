import expect from "remote_expectations/expect";
import fixtures from 'remote_expectations/fixtures';
import routes from 'remote/routes';

let { apiVersion } = fixtures.helloWorld;

export function expectApiVersion({fixture=apiVersion()}={}) {
  expect.get(routes.helloWorldPath(), { 
    response: { body: fixture }
  });
}
