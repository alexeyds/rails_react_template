import { apiVersion } from './fixtures';
import expectationsClient from "api_expectations/expectations_client";
import { routes } from 'api_client';

export function expectApiVersion({fixture=apiVersion()}={}) {
  expectationsClient.expectGet(routes.helloWorldPath(), { 
    response: { body: fixture }
  });
}
