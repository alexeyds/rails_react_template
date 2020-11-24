import React from "react";
import routes from "application/routes";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Redirect } from "react-router";
import { useStore } from "effector-react";
import { sessionStore } from "current_session/session_store";

export default function UserLayout({children}) {
  let session = useStore(sessionStore);

  if (session) {
    return (
      <div>
        <Navbar/>
        <div className="columns is-gapless full-height-content">
          <div className="column is-narrow sidebar">
            <Sidebar/>
          </div>
          <div className="column">
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to={routes.loginPath()}/>;
  }
}
