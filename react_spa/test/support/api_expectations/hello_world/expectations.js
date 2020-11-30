import { apiVersion } from './fixtures';
import expectationsClient from "api_expectations/expectations_client";
import routes from 'remote/routes';

export function expectApiVersion({fixture=apiVersion()}={}) {
  expectationsClient.expectGet(routes.helloWorldPath(), { 
    response: { body: fixture }
  });
}
