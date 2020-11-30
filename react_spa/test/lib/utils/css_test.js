import jutest from "jutest";
import { addClass } from "utils/css";

jutest("utils/css", s => {
  s.describe("addClass", s => {
    s.test("adds class to existing classes string", t => {
      t.equal(addClass('foo bar', 'baz'), 'foo bar baz');
    });

    s.test("returns new string if classes are undefined", t => {
      t.equal(addClass(undefined, 'baz'), 'baz');
    });
  });
});
