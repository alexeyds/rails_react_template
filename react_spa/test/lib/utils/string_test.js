import jutest from "jutest";
import { capitalize } from "utils/string";

jutest("utils/string", function(t) {
  t.describe("capitalize", function(t) {
    t.test("capitalizes first letter", function(t) {
      t.equal(capitalize('fooObar'), 'FooObar');
    });
  });
});
