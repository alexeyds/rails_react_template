import jutest from "test/browser_jutest";
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
});
