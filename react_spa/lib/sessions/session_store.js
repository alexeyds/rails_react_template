import { isDeepEqual } from "utils/object";
import SessionCookie from "sessions/session_cookie";
import { createStore, createEvent } from 'effector';

let updateSessionFromCookie = createEvent('updateSessionFromCookie');

let sessionStore = createStore(SessionCookie.extract())
  .on(updateSessionFromCookie, (oldState) => {
    let newState = SessionCookie.extract();
    return isDeepEqual(newState, oldState) ? oldState : newState;
  });

export { sessionStore, updateSessionFromCookie };
