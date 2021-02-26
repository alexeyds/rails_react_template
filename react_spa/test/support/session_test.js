import jutest from "test/browser_jutest";
import { signIn, signOut, currentSession } from "support/session";

jutest("support/session", s => {
  s.describe("currentSession()", s => {
    s.test("returns null if user is not signed in", t => {
      t.equal(currentSession(), null);
    });

    s.test("returns session if user is signed in", t => {
      signIn();
      t.notEqual(currentSession(), null);
    });
  });

  s.describe("signOut()", s => {
    s.test("signs user out", t => {
      signIn();
      signOut();
      t.equal(currentSession(), null);
    });
  });
});
