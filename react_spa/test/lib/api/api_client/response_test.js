import jutest from "test/browser_jutest";
import { signIn } from "test/support/session";
import SessionCookie from "current_session/session_cookie";
import { fixtures as errorFixtures } from "api_expectations/errors";
import { sessionStore } from "current_session/session_store";
import normalizeApiResponse from "api/api_client/response";

jutest("normalizeApiResponse()", s => {
  function fetchResponse(opts) {
    fetch.mock('/test-response', { response: opts });
    return fetch('/test-response');
  }

  s.test("parses successfull responses", async t => {
    let response = await fetchResponse();
    let result = await normalizeApiResponse(response);

    t.equal(result.success, true);
    t.equal(result.body, '');
    t.equal(result.status, 200);
    t.equal(result.rawResponse, response);
    t.equal(result.error, null);
  });

  s.describe("#body", s => {
    s.test("is parsed as JSON", async t => {
      let result = await fetchResponse({ body: JSON.stringify({a: 1}) }).then(normalizeApiResponse);

      t.same(result.body, {a: 1});
    });

    s.test("is parsed with camelized keys", async t => {
      let result = await fetchResponse({ body: JSON.stringify({foo_bar: 1}) }).then(normalizeApiResponse);

      t.same(result.body, {fooBar: 1});
    });
  });

  s.describe("#error", s => {
    s.test("returns default message and details if response is not json", async t => {
      let result = await fetchResponse({ status: 404 }).then(normalizeApiResponse);

      let { message, details } = result.error;
      t.assert(message);
      t.equal(typeof message, 'string');
      t.same(details, {});
    });

    s.test("extracts error message and details", async t => {
      let error = JSON.stringify(errorFixtures.flowError({ message: 'foobar', details: { foo: 'bar' } }));
      let result = await fetchResponse({ status: 422, body: error }).then(normalizeApiResponse);

      let { message, details } = result.error;
      t.equal(message, 'foobar');
      t.same(details, { foo: 'bar' });
    });

    s.test("returns default message and details if response has no extractable errors", async t => {
      let result = await fetchResponse({ status: 404, body: JSON.stringify({}) }).then(normalizeApiResponse);

      let { message, details } = result.error;
      t.assert(message);
      t.equal(typeof message, 'string');
      t.same(details, {});
    });
  });

  s.describe("sessionStore", s => {
    s.test("is updated if response status is not ok", async t => {
      signIn();
      SessionCookie.set(null);
      await fetchResponse({ status: 404 }).then(normalizeApiResponse);
      t.equal(sessionStore.getState(), null);
    });

    s.test("is not updated if response status is ok", async t => {
      signIn();
      SessionCookie.set(null);
      await fetchResponse().then(normalizeApiResponse);
      t.notEqual(sessionStore.getState(), null);
    });
  });
});
