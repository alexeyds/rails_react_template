import jutest from "jutest";
import { factory } from "support/api/factory";

jutest("factory()", s => {
  s.test("defines factory", t => {
    let user = factory({ name: 'Bob' });
    t.same(user(), { name: 'Bob' });
  });

  s.test("allows overwriting factory values", t => {
    let user = factory({ id: 123, name: 'Bob' });
    t.same(user({name: 'John'}), { id: 123, name: 'John' });
  });

  s.test("resolves functional values", t => {
    let user = factory({ id: () => 123, name: 'Bob' });
    t.same(user(), { id: 123, name: 'Bob' });
  });

  s.test("does not add extra keys from passed assigns", t => {
    let user = factory({ name: 'Bob' });
    t.same(user({surname: 'Smith'}), { name: 'Bob' });
  });

  s.test("does not ignore falsy values in assigns", t => {
    let user = factory({ name: 'Bob' });
    t.same(user({name: null}), { name: null });
  });

  s.describe("#repeat()", s => {
    s.test("repeats build process {n} times", t => {
      let n = 0;
      let user = factory({ name: () => `John${n++}` });
      t.same(user.repeat(2), [ {name: 'John0' }, { name: 'John1' } ]);
    });

    s.test("accepts assigns", t => {
      let user = factory({ name: 'Bob' });
      t.same(user.repeat(2, { name: "John" }), [ {name: 'John' }, { name: 'John' } ] );
    });
  });

  s.describe("#derive()", s => {
    s.test("derives factory from existing one", t => {
      let nameFactory = factory({ name: 'John' });
      let user = nameFactory.derive({ surname: 'Smith' });

      t.same(user(), { name: 'John', surname: 'Smith' });
    });
  });
});
