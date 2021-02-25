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
        <div className='viewport'>
          <Sidebar activeSection={activeSidebarSection}/>
          <div className='container-fluid'>
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <Redirect to={routes.loginPath()}/>;
  }
}
