import jutest from "test/browser_jutest";
import request from "remote/request";
import expectations from "test/support/remote/expectations";
import RemoteError from "remote/remote_error";

jutest("RemoteError", s => {
  s.describe(".fromRejection()", s => {
    s.test("returns error with rejection message", t => {
      let error = RemoteError.fromRejection(new Error('test'));

      t.match(error.message, /test/);
      t.same(error.details, {});
    });
  });

  s.describe(".fromResponse", s => {
    function fetchResponse(response) {
      fetch.mock('/remote-errors-test', { response });
      return request('/remote-errors-test');
    }

    s.test("returns error message with response status", async t => {
      let error = await fetchResponse({ status: 422 }).then(RemoteError.fromResponse);

      t.match(error.message, /422/);
      t.same(error.details, {});
    });

    s.test("extracts server errors", async t => {
      let body = expectations.errors.flowError({message: 'foobar', details: { foo: 'bar' }});
      let error = await fetchResponse({ body: JSON.stringify(body) }).then(RemoteError.fromResponse);

      t.equal(error.message, 'foobar');
      t.same(error.details, {foo: 'bar'});
    });
  });
});
