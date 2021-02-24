import jutest from "test/browser_jutest";
import conn from "api_client/json_connection";
import expectation from "support/api/expectation";

jutest("expectation()", s => {
  s.describe(".expect()", s => {
    let fixture = () => ({ name: 'John' });
    let route = '/users/123';

    s.test("defines fetch expectation", async t => {
      let expect = expectation({ method: "GET", fixture, route });
      expect();

      let error = await conn.post(route).catch(e => e);
      t.match(error, /Unexpected fetch/);

      let response = await conn.get(route);
      t.same(response.body, { name: 'John' });
    });

    s.test("has {response} option", async t => {
      let expect = expectation({ method: "GET", fixture, route });
      expect({ response: { name: "Bob" } });
      let response = await conn.get(route);

      t.same(response.body, { name: "Bob" });
    });

    s.test("has {body} option", async t => {
      let expect = expectation({ method: "POST", fixture, route });
      expect({ body: {a: 1} });

      let error = await conn.post(route, { body: { a: 2 } }).catch(e => e);
      t.match(error, /Unexpected fetch/);

      let response = await conn.post(route, { body: { a: 1 } });
      t.equal(response.ok, true);
    });

    s.test("converts {body} keys to underscore notation", async t => {
      let expect = expectation({ method: "POST", fixture, route });
      expect({ body: {fooBar: 1} });

      let response = await conn.post(route, { body: { foo_bar: 1 } });
      t.equal(response.ok, true);
    });

    s.test("has {status} option", async t => {
      let expect = expectation({ method: "GET", fixture, route });
      expect({ status: 202 });
      let response = await conn.get(route);

      t.same(response.status, 202);
    });

    s.test("returns response with camelized keys", async t => {
      let expect = expectation({ method: "GET", fixture: () => ({ name_test: 'John' }), route });
      let result = expect();

      t.same(result, { nameTest: 'John' });
      await fetch(route);
    });
  });

  s.test("has shortcuts for common http methods", async t => {
    let expect = expectation.get('/users', () => ({ users: [] }));
    expect();
    let response = await conn.get('/users');

    t.same(response.body, { users: [] });
  });

  s.test("has error expectations", async t => {
    let expect = expectation.get('/users', () => 'stub');
    expect.flowError({ message: 'test' });
    let response = await conn.get('/users');

    t.equal(response.status, 422);
    t.equal(response.body.error.message, 'test');
  });
});
