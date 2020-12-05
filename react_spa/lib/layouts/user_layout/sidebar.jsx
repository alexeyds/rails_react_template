import React from "react";
import { map } from "utils/object";
import routes from "application/routes";
import { Link } from "react-router-dom";

export let sidebarSections = {
  helloWorld: { name: 'Hello world', icon: 'globe', path: routes.helloWorldPath() }
};

export default function Sidebar({activeSection}) {
  return (
    <aside className="menu">
      <ul className="menu-list">
        {map(sidebarSections, (id, section) => (
          <SidebarSection key={id} id={id} section={section} activeSection={activeSection}/>
        ))}
      </ul>
    </aside>
  );
}

function SidebarSection({id, section, activeSection}) {
  let className = section === activeSection ? 'is-active' : '';

  return (
    <li test-id={`sidebar-section-${id}`} className={className}>
      <Link to={section.path}>
        <i className={`fas fa-${section.icon}`}/>
        <span>{section.name}</span>
      </Link>
    </li>
  );
}

