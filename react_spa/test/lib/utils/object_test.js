import jutest from "jutest";
import { 
  isPlainObject, 
  map, 
  deepMapKeys, 
  deepCamelizeKeys, 
  isDeepEqual, 
  dig, 
  fromFlatArray,
  deepSnakifyKeys,
  deepMerge
} from "utils/object";

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

  s.describe("deepSnakifyKeys()", s => {
    s.test("converts object keys to snake case", t => {
      let result = deepSnakifyKeys({fooBar: { barBaz: 2 }});
      t.same(result, {foo_bar: { bar_baz: 2 }});
    });
  });

  s.describe("isDeepEqual()", s => {
    s.test("checks if objects are deep equal", t => {
      t.equal(isDeepEqual({a: 1}, {a: 1}), true);
      t.equal(isDeepEqual({a: { b: 1 }}, {a: { b: 1 }}), true);
      t.equal(isDeepEqual({a: { b: 2 }}, {a: { b: 1 }}), false);
    });
  });

  s.describe("dig()", s => {
    s.test("digs for path inside of object", t => {
      t.equal(dig({a: 1}, 'a'), 1);
      t.equal(dig({a: { b: 2 }}, 'a.b'), 2);
      t.equal(dig({}, 'a'), undefined);
      t.equal(dig({}, 'a.b', 'default'), 'default');
    });
  });

  s.describe("fromFlatArray()", s => {
    s.test("converts array to object", t => {
      t.same(fromFlatArray(['foo', 'bar']), { foo: 'foo', bar: 'bar' });
    });
  });

  s.describe("map()", s => {
    s.test("maps object to array", t => {
      let result = map({a: 1}, (k, v) => `${k} ${v}`);
      t.same(result, ['a 1']);
    });
  });

  s.describe("deepMerge()", s => {
    s.test("deep merges objects", t => {
      let result = deepMerge({a: { b: 1, c : 2 }}, {a: { b: 4 }});
      t.same(result, { a: { b: 4, c: 2 }});
    });

    s.test("does not mutate original object", t => {
      let original = { a: 1 };
      let result = deepMerge(original, {b: 2});

      t.notEqual(original, result);
      t.same(original, { a: 1 });
    });
  });
});
