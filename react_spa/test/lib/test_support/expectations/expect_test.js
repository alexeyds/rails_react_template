import jutest from "test/browser_jutest";
import expect from "test/support/remote/expect";

jutest("expect()", s => {
  s.test("defines fetch expectation", async t => {
    expect('/test');
    let response = await fetch('/test');

    t.equal(response.status, 200);
  });

  s.test("stringifies response body", async t => {
    expect('/test', { response: { body: { a: 1 } } });
    let body = await fetch('/test').then(r => r.json());

    t.same(body, { a: 1 });
  });

  s.test("preserves other fetch.mock options", async t => {
    expect('/test', { 
      response: { body: {a: 1}, status: 404 },
      request: { credentials: 'include' }
    });

    let response = await fetch('/test', { credentials: 'include' });

    t.equal(response.status, 404);
  });

  s.test("has shortcuts for common http methods", async t => {
    expect.post('/test', { request: { body: {a: 1} } });
    let response = await fetch('/test', { 
      method: 'POST', 
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({a: 1})
    });

    t.equal(response.status, 200);
  });
});
