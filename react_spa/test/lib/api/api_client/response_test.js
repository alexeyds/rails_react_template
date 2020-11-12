import jutest from "test/browser_jutest";
import { parseJSON } from "api/api_client/response";

jutest("api_client/response", function(t) {
  function fetchResponse(opts) {
    fetch.mock('/test-response', { response: opts });
    return fetch('/test-response');
  }

  t.describe("parseJSON()", function(t) {
    t.test("returns {success, body, fetchResponse} object", async function(t) {
      let response = await fetchResponse();
      let result = await parseJSON(response);

      t.equal(result.success, true);
      t.equal(result.body, '');
      t.equal(result.status, 200);
      t.equal(result.fetchedResponse, response);
    });

    t.test("parses response body as JSON", async function(t) {
      let result = await fetchResponse({ body: JSON.stringify({a: 1}) }).then(parseJSON);

      t.same(result.body, {a: 1});
    });

    t.test("returs success: false if response status shows failure", async function(t) {
      let result = await fetchResponse({ status: 404 }).then(parseJSON);

      t.equal(result.success, false);
      t.equal(result.status, 404);
    });
  });
});
