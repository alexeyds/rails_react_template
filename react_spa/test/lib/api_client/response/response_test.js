import jutest from "test/browser_jutest";
import { signIn } from "test/support/session";
import SessionCookie from "current_session/session_cookie";
import { fixtures as errorFixtures } from "api_expectations/errors";
import { sessionStore } from "current_session/session_store";
import { handleServerResponse, handleFetchError } from "api_client/response";

jutest("api_client/response", s => {
  s.describe("handleServerResponse()", s => {
    function fetchResponse(opts) {
      fetch.mock('/test-response', { response: opts });
      return fetch('/test-response');
    }

    s.test("parses successfull responses", async t => {
      let response = await fetchResponse();
      let result = await handleServerResponse(response);

      t.equal(result.success, true);
      t.equal(result.body, '');
      t.equal(result.status, 200);
      t.equal(result.rawResponse, response);
      t.equal(result.error, null);
    });

    s.test("parses response JSON", async t => {
      let result = await fetchResponse({ body: JSON.stringify({a: 1}) }).then(handleServerResponse);
      t.same(result.body, {a: 1});
    });

    s.test("extracts error message and details", async t => {
      let error = JSON.stringify(errorFixtures.flowError({ message: 'foobar', details: { foo: 'bar' } }));
      let result = await fetchResponse({ status: 422, body: error }).then(handleServerResponse);

      let { message, details } = result.error;
      t.equal(message, 'foobar');
      t.same(details, { foo: 'bar' });
    });

    s.test("updates sessionStore if response status is not ok", async t => {
      signIn();
      SessionCookie.set(null);
      await fetchResponse({ status: 404 }).then(handleServerResponse);
      t.equal(sessionStore.getState(), null);
    });
  });

  s.describe("handleFetchError", s => {
    s.test("returns response object", async t => {
      let result = handleFetchError('foobar');

      t.equal(result.success, false);
      t.equal(result.body, null);
      t.equal(result.status, null);
      t.equal(result.rawResponse, null);

      let { message, details } = result.error;
      t.match(message, /foobar/);
      t.same(details, {});
    });
  });
});
