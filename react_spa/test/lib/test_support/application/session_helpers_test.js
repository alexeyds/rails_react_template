import jutest from "test/browser_jutest";
import { signIn, currentSession } from "test/support/application/session_helpers";

jutest("application/session_helpers", s => {
  s.describe("currentSession()", s => {
    s.test("returns null if user is not signed in", t => {
      t.equal(currentSession(), null);
    });

    s.test("returns session if user is signed in", t => {
      signIn();
      t.notEqual(currentSession(), null);
    });
  });
});
