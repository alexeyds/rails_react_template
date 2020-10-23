import "home_page/styles/home_page.scss";
import logo from "home_page/images/react_logo.png";
import { Link } from "react-router-dom";
import React from "react";

export default function HomePage() {
  return (
    <div className="home-page" test-id="home-page">
      <img test-id="welcome-image" src={logo}/>
      <h1>Hello!</h1>
      <Link to="/foobar">Foobar</Link>
    </div>
  );
}
