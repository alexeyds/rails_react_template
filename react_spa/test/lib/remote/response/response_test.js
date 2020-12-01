import jutest from "test/browser_jutest";
import { fixtures } from "remote_expectations";
import Response from "remote/response";

jutest("Response", s => {
  s.describe("#constructor", s => {
    s.test("allows overwriting resposne attributes via options", t => {
      let response = new Response({ success: true, status: 202, body: 'foobar', rawResponse: 'stub', error: 'err'});

      t.equal(response.success, true);
      t.equal(response.status, 202);
      t.equal(response.body, 'foobar');
      t.equal(response.rawResponse, 'stub');
      t.equal(response.error, 'err');
    });

    s.test("camelizes response body keys", t => {
      let response = new Response({ body: { foo_bar: "baz" } });

      t.same(response.body, {fooBar: "baz"});
    });
  });

  s.describe(".fromFetchResponse()", s => {
    function fetchResponse(opts) {
      fetch.mock('/test-response', { response: opts });
      return fetch('/test-response');
    }

    s.test("parses response details", async t => {
      let response = await fetchResponse();
      let result = await Response.fromFetchResponse(response);

      t.equal(result.success, true);
      t.equal(result.body, '');
      t.equal(result.status, 200);
      t.equal(result.rawResponse, response);
      t.equal(result.error, null);
    });

    s.test("parses response JSON", async t => {
      let result = await fetchResponse({ body: JSON.stringify({a: 1}) }).then(Response.fromFetchResponse);
      t.same(result.body, {a: 1});
    });

    s.test("parses non-200 responses", async t => {
      let result = await fetchResponse({ status: 404 }).then(Response.fromFetchResponse);

      t.equal(result.success, false);
      t.equal(result.status, 404);
    });
  });

  s.describe(".fromError()", s => {
    s.test("returns empty failed response", t => {
      let result = Response.fromError('foobar');

      t.equal(result.success, false);
      t.equal(result.body, null);
      t.equal(result.status, null);
      t.equal(result.rawResponse, null);
      t.equal(result.error, 'foobar');
    });
  });

  s.describe("#errorMessage", s => {
    s.test("return null if response is successful", t => {
      let response = new Response({success: true});
      t.equal(response.errorMessage, null);
    });

    s.test("returns server error message", t => {
      let body = fixtures.errors.flowError({ message: 'foobartest' });
      let response = new Response({success: false, body});
      t.equal(response.errorMessage, 'foobartest');
    });

    s.test("returns default error message if response body has no error message", t => {
      let response = new Response({success: false, body: {}, status: 404});
      t.match(response.errorMessage, /404/);
    });

    s.test("returns error message", t => {
      let response = new Response({success: false, error: new Error('foobartest')});
      t.match(response.errorMessage, /foobartest/);
    });
  });

  s.describe("#errorDetails", s => {
    s.test("returns empty object if response has no errors", t => {
      let response = new Response({success: true});
      t.same(response.errorDetails, {});
    });

    s.test("returns error details", t => {
      let body = fixtures.errors.flowError({ details: { email: 'required' } });
      let response = new Response({success: false, body});
      t.same(response.errorDetails, { email: 'required' });
    });
  });
});
