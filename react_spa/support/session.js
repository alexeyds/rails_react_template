import { fixtures } from "support/api";
import { useSessionStore } from "sessions/session_store";

export function signIn(user=fixtures.user()) {
  useSessionStore.getState().setSession(fixtures.session({ user }));
}

export function signOut() {
  useSessionStore.getState().clearSession();
}

export function currentSession() {
  return useSessionStore.getState().session;
}
