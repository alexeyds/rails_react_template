import { apiVersion } from './fixtures';
import expectationsClient from "test/api_expectations/expectations_client";
import routes from 'api/routes';

export function expectApiVersion({fixture=apiVersion()}={}) {
  expectationsClient.expectGet(routes.helloWorldPath(), { 
    response: { body: fixture }
  });
}
