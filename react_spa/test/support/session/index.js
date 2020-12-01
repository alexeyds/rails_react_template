import SessionCookie from "current_session/session_cookie";
import { fixtures } from "remote_expectations";
import { sessionStore, updateSessionFromCookie } from "current_session/session_store";

export function signIn() {
  SessionCookie.set(JSON.stringify(fixtures.sessions.session()));
  updateSessionFromCookie();
}

export function currentSession() {
  return sessionStore.getState();
}