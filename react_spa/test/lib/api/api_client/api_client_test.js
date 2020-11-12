import jutest from "test/browser_jutest";
import apiClient from "api/api_client";

jutest("apiClient", function(t) {
  t.describe("executeRequest", function(t) {
    t.test("fetches endpoint and parses JSON response", async function(t) {
      fetch.mock('/api-client', { 
        response: { body: JSON.stringify({ hi: 'hello' }) } 
      });
      let result = await apiClient.executeRequest('/api-client');

      t.equal(result.success, true);
      t.same(result.body, { hi: 'hello' });
    });
  });

  t.test("has shortcuts for common http methods", async function(t) {
    fetch.mock('/api-client', { 
      request: { method: "POST", body: { foo: 'bar' } }
    });
    let result = await apiClient.post('/api-client', { body: { foo: 'bar' } });

    t.equal(result.success, true);
  });
});
