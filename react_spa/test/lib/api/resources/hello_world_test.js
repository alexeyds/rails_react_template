import jutest from "test/browser_jutest";
import api from "api/resources";
import { expectations } from "test/api_expectations/hello_world";

jutest("api.helloWorld", function(t) {
  t.describe("#getApiVersion", function(t) {
    t.test("fetches api version", async function(t) {
      expectations.expectApiVersion();

      let response = await api.helloWorld.getApiVersion();

      t.equal(response.status, 200);
      t.equal(typeof response.body, 'object');
      t.notSame(response.body, {});
    });
  });
});
