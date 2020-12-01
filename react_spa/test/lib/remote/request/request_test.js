import jutest from "test/browser_jutest";
import request from "remote/request";
import { signIn, currentSession } from "test/support/session";
import SessionCookie from "current_session/session_cookie";

jutest("request()", s => {
  s.test("fetches endpoint and parses JSON response", async t => {
    fetch.mock('/test-remote', { 
      response: { body: JSON.stringify({ hi: 'hello' }) }
    });
    let result = await request('/test-remote');

    t.equal(result.success, true);
    t.same(result.body, { hi: 'hello' });
  });

  s.test("updates current session if response status is not ok", async t => {
    signIn();

    fetch.mock('/test-remote', { response: { status: 400 } });
    SessionCookie.set(null);
    await request('/test-remote');

    t.equal(currentSession(), null);
  });

  s.test("has shortcuts for common http methods", async t => {
    fetch.mock('/test-remote', { 
      request: { method: "POST", body: { foo: 'bar' } }
    });
    let result = await request.post('/test-remote', { body: { foo: 'bar' } });

    t.equal(result.success, true);
  });
});
