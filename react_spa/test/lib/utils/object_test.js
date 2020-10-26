import test from "enhanced-tape";
import { merge } from "utils/object";

test("utils/object", function(t) {
  t.test("merge()", function(t) {
    t.test("merges two objects", function(t) {
      let result = merge({foo: 'bar'}, {bar: 'baz'});
      t.same(result, { foo: 'bar', bar: 'baz' });
    });

    t.test("does not mutate original object", function(t) {
      let source = { foo: 'bar' };
      merge(source, { bar: 'baz' });
      t.same(source, { foo: 'bar' });
    });
  });
});
