import jutest from "test/browser_jutest";
import Connection from "api_client/connection";

jutest("Connection", s => {
  let simpleConn = new Connection();

  s.describe("#request", s => {
    s.test("sends regular fetch request", async t => {
      fetch.mock('/test');
      let response = await simpleConn.request('/test');

      t.equal(response.ok, true);
    });

    s.test("includes request options", async t => {
      fetch.mock('/test', { request: { method: 'POST' } });
      let response = await simpleConn.request('/test', { method: "POST" });

      t.equal(response.ok, true);
    });

    s.test("returns parsed response", async t => {
      fetch.mock('/test', { response: { body: 'hi' } });
      let response = await simpleConn.request('/test');

      t.equal(response.ok, true);
      t.equal(response.body, 'hi');
      t.equal(response.error, null);
    });

    s.test("has shortcuts for common http methods", async t => {
      fetch.mock('/test', { request: { method: 'POST', body: 'test' } });
      let response = await simpleConn.post('/test', { body: 'test' });

      t.equal(response.ok, true);
    });
  });

  s.describe("constructor", s => {
    s.test("accepts request builder function", async t => {
      let conn = new Connection(request => {
        request.body = 'hello';
        request.addHeader('Content-Type', 'text/plain');
        request.method = "POST";
      });

      fetch.mock('/test', { request: { body: 'hello', headers: { 'content-type': 'text/plain' } } });
      let response = await conn.request('/test');

      t.equal(response.ok, true);
    });

    s.test("accepts response parser function", async t => {
      let conn = new Connection(null, response => {
        response.body = JSON.parse(response.body);
      });

      fetch.mock('/test', { response: { body: '{"foo": "bar"}' } });
      let response = await conn.request('/test');

      t.same(response.body, { foo: 'bar' });
    });
  });

  s.describe("#rawRequest", s => {
    s.test("returns raw fetch response", async t => {
      fetch.mock('/test', { response: { body: 'test' }, request: { method: "POST" } });
      let response = await simpleConn.rawRequest('/test', { method: 'POST' });

      t.equal(response.ok, true);
      t.equal(await response.text(), 'test');
    });

    s.test("applies only request builder function", async t => {
      let conn = new Connection(
        request => {
          request.credentials = 'include';
        },
        () => { throw new Error('should not be called'); }
      );

      fetch.mock('/test', { request: { credentials: 'include' } });
      let response = await conn.rawRequest('/test');

      t.equal(response.ok, true);
    });
  });
});
