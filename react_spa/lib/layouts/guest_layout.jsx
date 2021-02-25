import React from "react";
import routes from "application/routes";
import { Redirect } from "react-router";
import { useSession } from "sessions/session_store";

export default function GuestLayout({children}) {
  let session = useSession();

  if (session) {
    return <Redirect to={routes.rootPath()}/>;
  } else {  
    return (
      <div className="bg-light">
        <div className="container">
          <div className="row vh-100 align-items-center text-center justify-content-center">
            <div className="col col-lg-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
