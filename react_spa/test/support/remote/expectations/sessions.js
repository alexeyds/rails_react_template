import expect from "test/support/remote/expect";
import { flowError } from "test/support/remote/expectations/errors";
import SessionCookie from "current_session/session_cookie";
import routes from 'remote/resources/routes';

export function expectLogout() {
  SessionCookie.set(null);
  expect.delete(routes.sessionsPath(), { 
    response: { body: { current_session: null } }
  });
}

export function expectLogin(session=sessionFixture(), body) {
  SessionCookie.set(JSON.stringify(session));
  expect.post(routes.sessionsPath(), { 
    response: { body: { current_session: session } },
    request: { body }
  });
}

export function expectLoginError(error=flowError()) {
  expect.post(routes.sessionsPath(), {
    response: { body: error, status: 422 }
  });
}

export function sessionFixture() {
  return {
    expires_at: new Date(2040, 20).toISOString(),
    user: { id: 1 }
  };
}
