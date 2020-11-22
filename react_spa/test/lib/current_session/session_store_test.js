import jutest from "test/browser_jutest";
import SessionCookie from "current_session/session_cookie";
import { signIn } from "test/support/session";
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
  });

  s.describe("test setup", s => {
    SessionCookie.set(JSON.stringify({ a: 1 }));
    s.test("resets store state before each state", t => {
      t.same(sessionStore.getState(), null);
    });
  });

  s.describe("test/support/session", s => {
    s.test("has signIn() helper", t => {
      signIn();
      t.notEqual(sessionStore.getState(), null);
    });
  });
});
