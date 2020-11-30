import jutest from "jutest";
import { generalError } from "errors/messages";

jutest("errors/messages", s => {
  s.describe("generalError()", s => {
    s.test("return error string", t => {
      let result = generalError();

      t.equal(typeof result, 'string');
      t.assert(result);
    });

    s.test("includes custom explanation", t => {
      let result = generalError({explanation: 'foobartest'});
      t.match(result, /foobartest/);
    });
  });
});
