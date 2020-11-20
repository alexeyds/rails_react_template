import jutest from "test/browser_jutest";
import Cookies from 'js-cookie';
import SessionCookie from "current_session/session_cookie";

jutest("SessionCookie", s => {
  s.describe(".extract()", s => {
    s.test("returns null if cookie is not set", t => {
      t.equal(SessionCookie.extract(), null);
    });

    s.test("parses cookie value", t => {
      Cookies.set(SessionCookie.COOKIE_NAME, JSON.stringify({ foo: 'bar' }));
      t.same(SessionCookie.extract(), { foo: 'bar' });
    });

    s.test("returns null if cookie value cant be parsed", t => {
      Cookies.set(SessionCookie.COOKIE_NAME, 'foobar');
      t.same(SessionCookie.extract(), null);
    });

    s.test("it camelizes parsed cookie's keys", t => {
      Cookies.set(SessionCookie.COOKIE_NAME, JSON.stringify({ foo_bar: 'bar' }));
      t.same(SessionCookie.extract(), { fooBar: 'bar' });
    });

    s.test("it returns null if cookie value is not an object", t => {
      Cookies.set(SessionCookie.COOKIE_NAME, JSON.stringify(1));
      t.same(SessionCookie.extract(), null);
    });
  });
});
