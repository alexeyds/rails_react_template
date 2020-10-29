import test from "test/browser_tape";
import Response from "api/response";

test("Response", function(t) {
  t.test("parseJSON()", function(t) {
    async function fetchResponse(body) {
      fetch.mock('/test', { response: { body } });
      return await fetch('/test');
    }

    t.test("parses response JSON", async function(t) {
      let response = await fetchResponse(JSON.stringify({ a: 1 }));
      let result = await Response.parseJSON(response);

      t.same(result, { a: 1 });
    });

    t.test("returns unparsable bodies as is", async function(t) {
      let response = await fetchResponse('foobar');
      let result = await Response.parseJSON(response);

      t.equal(result, 'foobar');
    });
  });
});
