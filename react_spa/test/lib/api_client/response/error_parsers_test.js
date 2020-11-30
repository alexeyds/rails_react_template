import jutest from "test/browser_jutest";
import { parseServerError, parseFetchError } from "api_client/response/error_parsers";

jutest("response/error_parsers", s => {
  s.describe("parseServerError()", s => {
    s.test("extracts error message and details", t => {
      let body = { error: { message: 'foobar', details: { foo: 'bar' } } };
      let result = parseServerError({body, status: 404});

      t.equal(result.message, 'foobar');
      t.same(result.details, { foo: 'bar' });
    });

    s.test("returns defaults if body cant be parsed", t => {
      let result = parseServerError({body: '', status: 404});

      t.match(result.message, /404/);
      t.same(result.details, {});
    });

    s.test("returns defaults if body.error is empty", t => {
      let result = parseServerError({body: {}, status: 404});

      t.match(result.message, /404/);
      t.same(result.details, {});
    });

    s.test("fills defaults if body.error is missing some", t => {
      let result = parseServerError({body: { error: {} }, status: 404});

      t.match(result.message, /404/);
      t.same(result.details, {});
    });
  });

  s.describe("parseFetchError", s => {
    s.test("extracts Error#message", t => {
      let result = parseFetchError(new Error('foobar'));

      t.match(result.message, /foobar/);
      t.same(result.details, {});
    });

    s.test("converts other objects to string", t => {
      let result = parseFetchError(undefined);

      t.match(result.message, /undefined/);
    });
  });
});
