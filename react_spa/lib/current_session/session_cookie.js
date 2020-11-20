import Cookies from 'js-cookie';
import { deepCamelizeKeys, isPlainObject } from "utils/object";
import { safeParseJSON } from "utils/json";

const COOKIE_NAME = 'current_session';

export default {
  COOKIE_NAME,

  extract() {
    let cookie = Cookies.get(COOKIE_NAME);

    if (cookie) {
      return parseCookieJSON(cookie);
    } else {
      return null;
    }
  }
};

function parseCookieJSON(cookie) {
  let parsed = safeParseJSON(cookie);

  if (parsed.success && isPlainObject(parsed.value)) {
    return deepCamelizeKeys(parsed.value);
  } else {
    return null;
  }
}
