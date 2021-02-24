import jutest from "jutest";
import { repeat } from "utils/array";

jutest("utils/array", s => {
  s.describe("repeat()", s => {
    s.test("calls given function n times and returns array of results", t => {
      t.same(repeat(3, () => 1), [1, 1, 1]);
    });

    s.test("does not pass any arguments to given function", t => {
      function returnArgs() { 
        return [...arguments];
      }

      t.same(repeat(2, returnArgs), [[], []]);
    });
  });
});
