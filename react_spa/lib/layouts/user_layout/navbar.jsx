import React from "react";
import logo from "images/react_logo.png";
import { Link } from "react-router-dom";
import routes from "application/routes";
import api from "api/resources";
import { updateSessionFromCookie } from "current_session/session_store";

export default function Navbar() {
  let logout = () => {
    api.sessions.destroy().then(() => updateSessionFromCookie());
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
