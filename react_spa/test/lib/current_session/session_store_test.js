import jutest from "test/browser_jutest";
import SessionCookie from "current_session/session_cookie";
import { signIn } from "test/support/application";
import { sessionStore, updateSessionFromCookie } from "current_session/session_store";

jutest("sessionStore", s => {
  s.describe(".getState()", s => {
    s.test("returns null by default", t => {
      t.equal(sessionStore.getState(), null);
    });
  });

  s.describe("updateSessionFromCookie()", s => {
    s.test("reads session from cookie", t => {
      SessionCookie.set(JSON.stringify({ a: 1 }));
      updateSessionFromCookie();
      t.same(sessionStore.getState(), { a: 1 });
    });

    s.test("does not update state if old state is equal to the new one", t => {
      SessionCookie.set(JSON.stringify({ a: 1 }));
      updateSessionFromCookie();
      let oldState = sessionStore.getState();

      updateSessionFromCookie();
      let newState = sessionStore.getState();

      t.equal(oldState, newState);
    });
  });

  s.describe("test/support/session", s => {
    s.test("has signIn() helper", t => {
      signIn();
      t.notEqual(sessionStore.getState(), null);
    });
  });
});
