import SessionCookie from "current_session/session_cookie";
import expectationsClient from "api_expectations/expectations_client";
import { routes } from 'api_client';
import { fixtures as errorFixtures } from "api_expectations/errors";
import { sessionDestroyed, sessionCreated, session } from './fixtures';

export function expectLogout() {
  SessionCookie.set(null);
  expectationsClient.expectDelete(routes.sessionsPath(), { 
    response: { body: sessionDestroyed() }
  });
}

export function expectLogin({currentSession=session(), body}={}) {
  SessionCookie.set(JSON.stringify(currentSession));
  expectationsClient.expectPost(routes.sessionsPath(), { 
    response: { body: sessionCreated({currentSession}) },
    request: { body }
  });
}

export function expectLoginError({message=undefined}={}) {
  let response = errorFixtures.validationError({ 
    message, 
    details: { email: 'not found ', password: 'invalid'} 
  });

  expectationsClient.expectPost(routes.sessionsPath(), {
    response: { body: response, status: 422 }
  });
}