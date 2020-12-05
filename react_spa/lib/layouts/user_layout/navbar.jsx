import React from "react";
import logo from "images/react_logo.png";
import { Link } from "react-router-dom";
import routes from "application/routes";
import resources from "remote/resources";
import { updateSessionFromCookie } from "sessions/session_store";

export default function Navbar() {
  let logout = () => {
    resources.sessions.logout().then(() => updateSessionFromCookie());
  };

  return (
    <nav className="navbar pr-5 is-dark">
      <div className="navbar-brand">
        <Link className="navbar-item" to={routes.rootPath()}>
          <img src={logo}/>
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <a className="navbar-item" test-id="logout-link" onClick={logout}>Logout</a>
        </div>
      </div>
    </nav>
  );
}
