import jutest from "test/browser_jutest";
import React from "react";
import { signIn } from "test/support/session";
import { render } from "test/support/react_renderer";
import { fixtures, expectations } from "remote_expectations";
import HelloWorldPage from "hello_world/hello_world_page";
import ApplicationEnv from "test/support/application_env";

jutest("HelloWorldPage", function(t) {
  t.test("fetches api version", async function(t) {
    signIn();
    expectations.helloWorld.expectApiVersion({
      fixture: fixtures.helloWorld.apiVersion({version: 'v3', locale: 'fr'}),
    });

    let page = render(<ApplicationEnv><HelloWorldPage/></ApplicationEnv>);
    await global.nextTick();

    t.equal(page.getByTestId('api-version').textContent, 'v3');
    t.equal(page.getByTestId('api-locale').textContent, 'fr');
  });
});

