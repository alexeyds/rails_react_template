import React, { useEffect } from "react";
import logo from "images/react_logo.png";
import { Link } from "react-router-dom";
import routes from "application/routes";
import resources from "api_client/resources";
import useRemote from "remote/use_api_remote";
import { useSessionStore } from "sessions/session_store";

export default function Navbar() {
  let clearSession = useSessionStore(s => s.clearSession);
  let [remote, logout] = useRemote(resources.sessions.destroy);

  useEffect(() => {
    if (remote.isSuccess) clearSession();
  }, [remote, clearSession]);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to={routes.rootPath()} className="navbar-brand">
        <img width='30' height='30' src={logo}/>
      </Link>
      <div className="justify-content-end">
        <div className="navbar-nav">
          <a className="navbar-item nav-link" test-id="logout-link" onClick={logout}>
            <span className='mr-1'><i className="fas fa-sign-out-alt"/></span>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
