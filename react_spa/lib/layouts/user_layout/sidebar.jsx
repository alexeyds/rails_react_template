import React from "react";
import routes from "application/routes";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="menu">
      <ul className="menu-list">
        <SidebarLink name="Hello world" icon="globe" path={routes.helloWorldPath()}/>
      </ul>
    </aside>
  );
}

function SidebarLink({name, path, icon}) {
  return (
    <li>
      <Link to={path}>
        <i className={`fas fa-${icon}`}/>
        <span>{name}</span>
      </Link>
    </li>
  );
}
