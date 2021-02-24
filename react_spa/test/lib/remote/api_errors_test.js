import jutest from "test/browser_jutest";
import { fetchAPIResponse, validationError, flowError } from "support/fetch";
import Remote from "remote/remote";
import { errorMessage, fieldError } from "remote/api_errors";

jutest("remote/api_errors", s => {
  s.describe("errorMessage()", s => {
    s.test("returns null if remote has no errors", t => {
      let remote = Remote.initialize().loading();
      t.equal(errorMessage(remote), null);
    });

    s.test("returns rejection error", t => {
      let remote = Remote.initialize().rejected(new Error('foobar'));
      t.match(errorMessage(remote), /foobar/);
    });

    s.test("returns response error", async t => {
      let response = await fetchAPIResponse(flowError({ message: 'test error' }));
      let remote = Remote.initialize().loaded(response);

      t.equal(errorMessage(remote), 'test error');
    });
  });

  s.describe("fieldError()", s => {
    s.test("returns null if remote has no errors", t => {
      let remote = Remote.initialize().loading();
      t.equal(fieldError(remote, 'name'), null);
    });

    s.test("extracts first error from response error details", async t => {
      let response = await fetchAPIResponse(validationError({ details: { name: ['invalid', 'wrong'] } }));
      let remote = Remote.initialize().loaded(response);

      t.equal(fieldError(remote, 'name'), 'invalid');
    });

    s.test("returns null if error has no details", async t => {
      let response = await fetchAPIResponse(flowError());
      let remote = Remote.initialize().loaded(response);

      t.equal(fieldError(remote, 'name'), null);
    });

    s.test("returns null if remote was rejected", async t => {
      let remote = Remote.initialize().rejected();

      t.equal(fieldError(remote, 'name'), null);
    });
  });
});
