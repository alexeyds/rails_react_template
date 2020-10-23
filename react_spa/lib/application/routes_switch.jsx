import React from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from 'home_page';
import HelloWorldPage from "hello_world/hello_world_page";
import NotFoundPage from "error_pages/not_found_page";

export default function RoutesSwitch() {
  return (
    <Switch>
      <Route exact path='/'><HomePage/></Route>
      <Route exact path='/hello_world'><HelloWorldPage/></Route>
      <Route path='*'><NotFoundPage/></Route>
    </Switch>
  );
}