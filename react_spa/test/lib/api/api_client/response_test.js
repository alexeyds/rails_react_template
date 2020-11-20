import jutest from "test/browser_jutest";
import { parseJSON } from "api/api_client/response";

jutest("api_client/response", s => {
  function fetchResponse(opts) {
    fetch.mock('/test-response', { response: opts });
    return fetch('/test-response');
  }

  s.describe("parseJSON()", s => {
    s.test("returns {success, body, fetchResponse} object", async t => {
      let response = await fetchResponse();
      let result = await parseJSON(response);

      t.equal(result.success, true);
      t.equal(result.body, '');
      t.equal(result.status, 200);
      t.equal(result.fetchedResponse, response);
    });

    s.test("parses response body as JSON", async t => {
      let result = await fetchResponse({ body: JSON.stringify({a: 1}) }).then(parseJSON);

      t.same(result.body, {a: 1});
    });

    s.test("returs success: false if response status shows failure", async t => {
      let result = await fetchResponse({ status: 404 }).then(parseJSON);

      t.equal(result.success, false);
      t.equal(result.status, 404);
    });

    s.test("camelizes response body keys", async t => {
      let result = await fetchResponse({ body: JSON.stringify({foo_bar: 1}) }).then(parseJSON);

      t.same(result.body, {fooBar: 1});
    });
  });
});
