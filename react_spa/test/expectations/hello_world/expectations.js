import { apiVersion } from './fixtures';
import routes from 'api/routes';

export function expectApiVersion({fixture=apiVersion()}={}) {
  fetch.mock(routes.helloWorldPath(), { 
    response: { body: JSON.stringify(fixture) },
    request: { method: 'GET' }
  });
}
