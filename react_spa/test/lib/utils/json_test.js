import jutest from "jutest";
import { safeParseJSON } from "utils/json";

jutest("utils/json", s => {
  s.describe("safeParseJSON()", s => {
    s.test("parses json", t => {
      let result = safeParseJSON(JSON.stringify({a: 1}));

      t.equal(result.success, true);
      t.same(result.value, { a: 1 });
    });

    s.test("returns value as is if it's unparsable", t => {
      let result = safeParseJSON('foobar');

      t.equal(result.success, false);
      t.same(result.value, 'foobar');
    });
  });
});
