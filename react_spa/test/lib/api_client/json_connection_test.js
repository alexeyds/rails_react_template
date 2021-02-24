import jutest from "test/browser_jutest";
import { expectJSON, flowError } from "support/fetch";
import conn from "api_client/json_connection";

jutest("JSONConnection", s => {
  s.describe("request builder", s => {
    s.test("behaves like regular connection", async t => {
      fetch.mock('/test');
      let response = await conn.request('/test');

      t.equal(response.ok, true);
      t.equal(response.body, '');
    });

    s.test("adds content-type header to request", async () => {
      fetch.mock('/test', { request: { headers: { 'content-type': 'application/json' } } });
      await conn.get('/test');
    });

    s.test("stringifies request body", async () => {
      fetch.mock('/test', { request: { body: { foo: 'bar' } } });
      await conn.post('/test', { body: { foo: 'bar' } });
    });

    s.test("converts request body keys to snake_case", async () => {
      fetch.mock('/test', { request: { body: { foo_bar: 'baz' } } });
      await conn.post('/test', { body: { fooBar: 'baz' } });
    });
  });

  s.describe("response parser", s => {
    s.test("parses response body as JSON", async t => {
      expectJSON('/test', { response: { body: { foo: 'bar' } } });
      let response = await conn.get('/test');

      t.same(response.body, { foo: 'bar' });
    });

    s.test("checks response type", async t => {
      fetch.mock('/test', { response: { headers: { 'Content-Type': 'dasjsonasd' } } });
      let response = await conn.get('/test');

      t.equal(response.body, '');
    });

    s.test("converts response keys to snakeCase", async t => {
      expectJSON('/test', { response: { body: { foo_bar: 'bar' } } });
      let response = await conn.get('/test');

      t.same(response.body, { fooBar: 'bar' });
    });
  });

  s.describe("error response parser", s => {
    s.test("does nothing if response is ok", async t => {
      fetch.mock('/test');
      let response = await conn.get('/test');

      t.equal(response.error, null);
    });

    s.test("sets default error on non-200 responses", async t => {
      fetch.mock('/test', { response: { status: 404 } });
      let { error } = await conn.get('/test');

      t.match(error.message, /404/);
      t.same(error.details, {});
    });

    s.test("extracts error from response", async t => {
      expectJSON('/test', { response: flowError({ message: 'test error' }) });
      let { error } = await conn.get('/test');

      t.equal(error.message, 'test error');
      t.same(error.details, {});
    });
  });
});
