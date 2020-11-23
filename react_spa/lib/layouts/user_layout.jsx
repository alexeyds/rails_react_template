import React from "react";
import routes from "application/routes";
import api from "api/resources";
import { Redirect } from "react-router";
import { useStore } from "effector-react";
import { sessionStore, updateSessionFromCookie } from "current_session/session_store";

export default function UserLayout({children}) {
  let session = useStore(sessionStore);

  if (session) {
    let logout = () => {
      api.sessions.destroy().then(() => updateSessionFromCookie());
    };

    return (
      <div>
        <div><a onClick={logout} test-id="logout-link">Logout</a></div>
        {children}
      </div>
    );
  } else {
    return <Redirect to={routes.loginPath()}/>;
  }
}
