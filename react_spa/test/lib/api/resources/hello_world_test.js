import test from "test/browser_tape";
import api from "api/resources";
import { expectations } from "test/expectations/hello_world";

test("api.helloWorld", function(t) {
  t.test("#getApiVersion", function(t) {
    t.test("fetches api version", async function(t) {
      expectations.expectApiVersion();

      let response = await api.helloWorld.getApiVersion();

      t.equal(response.status, 200);
      t.equal(typeof response.body, 'object');
      t.notSame(response.body, {});
    });
  });
});
