import expect from "remote_expectations/expect";
import routes from 'remote/routes';
import SessionCookie from "current_session/session_cookie";
import fixtures from 'remote_expectations/fixtures';

let { sessionDestroyed, session, sessionCreated } = fixtures.sessions;

export function expectLogout() {
  SessionCookie.set(null);
  expect.delete(routes.sessionsPath(), { 
    response: { body: sessionDestroyed() }
  });
}

export function expectLogin({currentSession=session(), body}={}) {
  SessionCookie.set(JSON.stringify(currentSession));
  expect.post(routes.sessionsPath(), { 
    response: { body: sessionCreated({currentSession}) },
    request: { body }
  });
}

export function expectLoginError({message=undefined}={}) {
  let response = fixtures.errors.validationError({ 
    message, 
    details: { email: 'not found ', password: 'invalid'} 
  });

  expect.post(routes.sessionsPath(), {
    response: { body: response, status: 422 }
  });
}