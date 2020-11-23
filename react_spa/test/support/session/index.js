import SessionCookie from "current_session/session_cookie";
import { fixtures } from "api_expectations/sessions";
import { sessionStore, updateSessionFromCookie } from "current_session/session_store";

export function signIn() {
  SessionCookie.set(JSON.stringify(fixtures.session()));
  updateSessionFromCookie();
}

export function currentSession() {
  return sessionStore.getState();
}