import jutest from "test/browser_jutest";
import { retrieveObject } from "utils/local_storage";
import { useSessionStore, SESSION_STORAGE_KEY } from "sessions/session_store";

let { getState } = useSessionStore;
let { setSession, clearSession } = getState();

jutest("sessionStore", s => {
  s.describe("getState()", s => {
    s.test("returns null by default", t => {
      t.equal(getState().session, null);
    });
  });

  s.describe("setSession()", s => {
    s.test("sets session object", t => {
      setSession({a: 1});

      t.same(getState().session, {a: 1});
      t.assert(retrieveObject(SESSION_STORAGE_KEY));
    });
  });

  s.describe("clearSession()", s => {
    s.test("removes session", t => {
      setSession({a: 1});
      clearSession();

      t.same(getState().session, null);
      t.equal(retrieveObject(SESSION_STORAGE_KEY), null);
    });
  });
});
