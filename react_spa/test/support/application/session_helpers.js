import SessionCookie from "current_session/session_cookie";
import expectations from "test/support/remote/expectations";
import { sessionStore, updateSessionFromCookie } from "current_session/session_store";

export function signIn() {
  SessionCookie.set(JSON.stringify(expectations.sessions.sessionFixture()));
  updateSessionFromCookie();
}

export function currentSession() {
  return sessionStore.getState();
}
