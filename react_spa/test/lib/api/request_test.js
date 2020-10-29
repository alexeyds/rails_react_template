import test from "test/browser_tape";
import Request from "api/request";

test("Request", function(t) {
  t.test("execute()", function(t) {
    t.test("fetches JSON", async function(t) {
      fetch.mock('/test', { request: { headers: {'content-type': 'application/json'} } });
      let response = await Request.execute('/test');

      t.equal(response.status, 200);
    });
  });

  t.test("has shortcuts for common HTTP methods", async function(t) {
    fetch.mock('/test', { request: { method: "POST", body: {a: 1} } });
    let response = await Request.post('/test', { body: { a: 1 } });

    t.equal(response.status, 200);
  });
});
