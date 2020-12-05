import jutest from "test/browser_jutest";
import SessionCookie from "sessions/session_cookie";

jutest("SessionCookie", s => {
  s.describe(".extract()", s => {
    s.test("returns null if cookie is not set", t => {
      t.equal(SessionCookie.extract(), null);
    });

    s.test("parses cookie value", t => {
      SessionCookie.set(JSON.stringify({ foo: 'bar' }));
      t.same(SessionCookie.extract(), { foo: 'bar' });
    });

    s.test("returns null if cookie value cant be parsed", t => {
      SessionCookie.set('foobar');
      t.same(SessionCookie.extract(), null);
    });

    s.test("it camelizes parsed cookie's keys", t => {
      SessionCookie.set(JSON.stringify({ foo_bar: 'bar' }));
      t.same(SessionCookie.extract(), { fooBar: 'bar' });
    });

    s.test("it returns null if cookie value is not an object", t => {
      SessionCookie.set(JSON.stringify(1));
      t.same(SessionCookie.extract(), null);
    });
  });

  s.describe("set()", s => {
    s.test("sets cookie", t => {
      SessionCookie.set(JSON.stringify({ foo: 'bar' }));
      t.same(SessionCookie.extract(), { foo: 'bar' });
    });
  });
});
