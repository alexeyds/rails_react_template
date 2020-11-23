import React from "react";
import routes from "application/routes";
import { Redirect } from "react-router";
import { useStore } from "effector-react";
import { sessionStore } from "current_session/session_store";

export default function GuestLayout({children}) {
  let session = useStore(sessionStore);

  if (session) {
    return <Redirect to={routes.rootPath()}/>;
  } else {  
    return (
      <section className="hero has-background-black-ter is-fullheight guest-hero">
        <div className="hero-body">
          {children}
        </div>
      </section>
    );
  }
}