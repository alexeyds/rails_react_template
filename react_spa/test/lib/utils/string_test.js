import jutest from "jutest";
import { capitalize, camelize } from "utils/string";

jutest("utils/string", (s) => {
  s.describe("capitalize()", (s) => {
    s.test("capitalizes first letter", (t) => {
      t.equal(capitalize('fooObar'), 'FooObar');
    });
  });

  s.describe("camelize()", s => {
    s.test("camelizes string", t => {
      t.equal(camelize('foo'), 'foo');
      t.equal(camelize('FooBar'), 'fooBar');
      t.equal(camelize('foo_bar'), 'fooBar');
      t.equal(camelize('foo-bar'), 'fooBar');
    });
  });
});
