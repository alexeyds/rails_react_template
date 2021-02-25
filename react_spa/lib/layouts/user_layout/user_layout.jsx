import React from "react";
import routes from "application/routes";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Redirect } from "react-router";
import { useSession } from "sessions/session_store";

export default function UserLayout({children, activeSidebarSection}) {
  let session = useSession();

  if (session) {
    return (
      <React.Fragment>
        <Navbar/>
        <div className='container-fluid'>
          <div className="columns is-gapless full-height-content">
            <div className="column is-narrow sidebar">
              <Sidebar activeSection={activeSidebarSection}/>
            </div>
            <div className="column">
              {children}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <Redirect to={routes.loginPath()}/>;
  }
}
