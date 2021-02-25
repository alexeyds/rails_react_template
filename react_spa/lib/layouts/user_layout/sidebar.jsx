import React from "react";
import { map } from "utils/object";
import routes from "application/routes";
import { Link } from "react-router-dom";

export let sidebarSections = {
  helloWorld: { name: 'Hello world', icon: 'globe', path: routes.helloWorldPath() }
};

export default function Sidebar({activeSection}) {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        {map(sidebarSections, (id, section) => (
          <SidebarSection key={id} id={id} section={section} activeSection={activeSection}/>
        ))}
      </div>
    </div>
  );
}

function SidebarSection({id, section, activeSection}) {
  let className = section === activeSection ? 'is-active' : '';

  return (
    <div test-id={`sidebar-section-${id}`} className={`sidebar-item ${className}`}>
      <Link to={section.path}>
        <i className={`fas fa-${section.icon}`}/>
        <span>{section.name}</span>
      </Link>
    </div>
  );
}

