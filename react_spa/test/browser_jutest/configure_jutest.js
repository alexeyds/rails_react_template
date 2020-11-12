import jutest from "jutest";
import { cleanup as unmountRenderedHooks } from 'test/support/hooks_renderer';
import { cleanup as unmountRenderedComponents } from "test/support/react_renderer";

jutest.setup(() => {
  localStorage.clear();
  sessionStorage.clear();
  clearCookies();
});

jutest.teardown(async () => {
  await unmountRenderedComponents();
  await unmountRenderedHooks();
});

jutest.beforeTestEnd(() => {
  fetch.validateAndResetMocks();
});

// From: https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
function clearCookies() {
  if (document.cookie === undefined) {
    return;
  }

  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
