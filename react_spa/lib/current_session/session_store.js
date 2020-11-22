import SessionCookie from "current_session/session_cookie";
import { createStore, createEvent } from 'effector';

let updateSessionFromCookie = createEvent('updateSessionFromCookie');

let sessionStore = createStore(SessionCookie.extract())
  .on(updateSessionFromCookie, () => SessionCookie.extract());

export { sessionStore, updateSessionFromCookie };
