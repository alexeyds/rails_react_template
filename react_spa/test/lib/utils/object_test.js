import jutest from "jutest";
import { isPlainObject, deepMapKeys, deepCamelizeKeys } from "utils/object";

jutest("utils/object", s => {
  s.describe("isPlainObject()", s => {
    s.test("check where value is an object", t => {
      t.equal(isPlainObject({}), true);
      t.equal(isPlainObject(undefined), false);
      t.equal(isPlainObject(() => {}), false);
      t.equal(isPlainObject([]), false);
    });
  });

  s.describe("deepMapKeys()", s => {
    let addTest = (k) => `${k}_test`;

    s.test("maps object keys", t => {
      let result = deepMapKeys({a: 1}, addTest);
      t.same(result, { a_test: 1 });
    });

    s.test("maps nested objects' keys", t => {
      let result = deepMapKeys({a: 1, b: { c: 2 }}, addTest);
      t.same(result, { a_test: 1, b_test: { c_test: 2 } });
    });

    s.test("maps keys of objects inside arrays", t => {
      let result = deepMapKeys({a: [{b: 1}]}, addTest);
      t.same(result, { a_test: [{ b_test: 1}] });
    });

    s.test("preservers non-object keys inside arrays", t => {
      let result = deepMapKeys({a: [1, 2]}, addTest);
      t.same(result, { a_test: [1, 2] });
    });
  });

  s.describe("deepCamelizeKeys()", s => {
    s.test("camelizes object keys", t => {
      let result = deepCamelizeKeys({foo_bar: { bar_baz: 2 }});
      t.same(result, { fooBar: { barBaz: 2 } });
    });
  });
});