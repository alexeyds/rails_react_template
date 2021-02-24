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
      <section className="hero is-light is-fullheight">
        <div className="hero-body">
          {children}
        </div>
      </section>
    );
  }
}