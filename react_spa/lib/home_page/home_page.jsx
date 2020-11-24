import React from "react";
import routes from "application/routes";
import { Link } from "react-router-dom";
import UserLayout from "layouts/user_layout";

export default function HomePage() {
  return (
    <UserLayout>
      <div className="home-page" test-id="home-page">
        <h1>Hello!</h1>
        <Link to={routes.helloWorldPath()}>Hello World API</Link>
      </div>
    </UserLayout>
  );
}
