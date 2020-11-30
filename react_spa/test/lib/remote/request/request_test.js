import jutest from "test/browser_jutest";
import request from "remote/request";
import { signIn } from "test/support/session";
import SessionCookie from "current_session/session_cookie";
import { sessionStore } from "current_session/session_store";

jutest("request()", s => {
  s.test("fetches endpoint and parses JSON response", async t => {
    fetch.mock('/test-remote', { 
      response: { body: JSON.stringify({ hi: 'hello' }) }
    });
    let result = await request('/test-remote');

    t.equal(result.success, true);
    t.same(result.body, { hi: 'hello' });
  });

  s.test("updates sessionStore if response status is not ok", async t => {
    signIn();
    SessionCookie.set(null);

    fetch.mock('/test-remote', { response: { status: 400 } });
    await request('/test-remote');

    t.equal(sessionStore.getState(), null);
  });

  s.test("has shortcuts for common http methods", async t => {
    fetch.mock('/test-remote', { 
      request: { method: "POST", body: { foo: 'bar' } }
    });
    let result = await request.post('/test-remote', { body: { foo: 'bar' } });

    t.equal(result.success, true);
  });
});
