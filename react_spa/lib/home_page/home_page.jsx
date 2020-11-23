import React from "react";
import logo from "home_page/images/react_logo.png";
import routes from "application/routes";
import { Link } from "react-router-dom";
import UserLayout from "layouts/user_layout";

export default function HomePage() {
  return (
    <UserLayout>
      <div className="home-page" test-id="home-page">
        <img test-id="welcome-image" src={logo}/>
        <h1>Hello!</h1>
        <Link to={routes.helloWorldPath()}>Hello World API</Link>
      </div>
    </UserLayout>
  );
}
