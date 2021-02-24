import jutest from "jutest";
import { storeObject, retrieveObject, remove } from "utils/local_storage";

jutest("utils/local_storage", s => {
  s.describe("retrieveObject()", s => {
    s.test("returns null if nothing is stored", t => {
      t.equal(retrieveObject('foo'), null);
    });

    s.test("returns null if object JSON is invalid", t => {
      localStorage.setItem('test', '12fsad3');
      t.equal(retrieveObject('test'), null);
    });
  });

  s.describe("storeObject()", s => {
    s.test("stores object", t => {
      let returnValue = storeObject('foo', { bar: 'baz' });

      t.same(retrieveObject('foo'), { bar: 'baz' });
      t.same(returnValue, { bar: 'baz' });
    });
  });

  s.describe("remove()", s => {
    s.test("removes stored record", t => {
      storeObject('foo', { test: 1 });

      t.equal(remove('foo'), null);
      t.equal(retrieveObject('foo'), null);
    });
  });
});
