import jutest from "test/browser_jutest";
import RequestBuilder from "api_client/connection/request_builder";

jutest("RequestBuilder", s => {
  s.describe("constructor", s => {
    s.test("accepts url", t => {
      let request = new RequestBuilder('/test');
      t.equal(request.url, '/test');
    });

    s.test("accepts options and assigns them to request", t => {
      let request = new RequestBuilder('/', { credentials: 'include', cache: 'reload' });

      t.equal(request.credentials, 'include');
      t.equal(request.cache, 'reload');
    });
  });

  s.describe("#options", s => {
    s.test("returns empty object if request has no options", t => {
      let request = new RequestBuilder('/');
      t.same(request.options, {});
    });
    
    s.test("returns all assigned options", t => {
      let request = new RequestBuilder('/', { credentials: 'include' });
      request.foobar = 'test';

      t.same(request.options, { credentials: 'include', foobar: 'test' });
    });
  });

  s.describe("#addHeaders", s => {
    s.test("adds headers", t => {
      let request = new RequestBuilder('/');
      request.addHeaders({ foo: 'bar' });

      t.same(request.headers, { foo: 'bar' });
    });

    s.test("merges headers with existing ones", t => {
      let request = new RequestBuilder('/', { headers: { foo: 'bar' } });
      request.addHeaders({ bar: 'baz' });
      request.addHeaders({ test: '123' });

      t.same(request.headers, { foo: 'bar', bar: 'baz', test: '123' });
    });
  });

  s.describe("#addHeader", s => {
    s.test("adds one header to the request", t => {
      let request = new RequestBuilder('/');
      request.addHeader('Content-Type', 'application/json');

      t.same(request.headers, { 'Content-Type': 'application/json' });
    });
  });
});
