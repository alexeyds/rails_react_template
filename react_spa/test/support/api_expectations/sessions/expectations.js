import { sessionDestroyed } from './fixtures';
import SessionCookie from "current_session/session_cookie";
import expectationsClient from "api_expectations/expectations_client";
import routes from 'api/routes';

export function expectLogout() {
  SessionCookie.set(null);
  expectationsClient.expectDelete(routes.sessionsPath(), { 
    response: { body: sessionDestroyed() }
  });
}
