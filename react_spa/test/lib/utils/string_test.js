import test from "enhanced-tape";
import { capitalize } from "utils/string";

test("utils/string", function(t) {
  t.test("capitalize", function(t) {
    t.test("capitalizes first letter", function(t) {
      t.equal(capitalize('fooObar'), 'FooObar');
    });
  });
});
