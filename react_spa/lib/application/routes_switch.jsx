import React from 'react';
import routes from "application/routes";
import { Switch, Route } from "react-router-dom";
import HomePage from 'home_page';
import HelloWorldPage from "hello_world/hello_world_page";
import LoginPage from "login/login_page";
import NotFoundPage from "error_pages/not_found_page";

export default function RoutesSwitch() {
  return (
    <Switch>
      <Route exact path={routes.rootPath.raw}><HomePage/></Route>
      <Route exact path={routes.helloWorldPath.raw}><HelloWorldPage/></Route>
      <Route exact path={routes.loginPath.raw}><LoginPage/></Route>
      <Route path='*'><NotFoundPage/></Route>
    </Switch>
  );
}