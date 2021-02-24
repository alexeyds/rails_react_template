import pathToRegexp from "path-to-regexp";
import { expectJSON } from "support/fetch";
import { createMatcher } from "fetcherino/dist/matchers";

export default function mockRoute(route, opts) {
  let pathMatcher = routeToMatcher(route);
  expectJSON(pathMatcher, opts);
}

function routeToMatcher(route) {
  let path = route.raw || route;
  let regexp = pathToRegexp(path);
  return createMatcher((path) => regexp.test(path), path);
}
