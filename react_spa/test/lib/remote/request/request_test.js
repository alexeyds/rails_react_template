import jutest from "test/browser_jutest";
import request from "remote/request";
import { signIn, currentSession } from "test/support/application";
import SessionCookie from "current_session/session_cookie";

jutest("request()", s => {
  s.test("fetches endpoint and parses response", async t => {
    fetch.mock('/test-remote');
    let response = await request('/test-remote');

    t.equal(response.success, true);
    t.equal(response.body, '');
    t.equal(response.status, 200);
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

    t.equal(result.status, 200);
  });
});
