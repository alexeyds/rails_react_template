import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { fixtures, expectations } from "test/api_expectations/hello_world";
import HelloWorldPage from "hello_world/hello_world_page";

jutest("HelloWorldPage", function(t) {
  t.test("fetches api version", async function(t) {
    expectations.expectApiVersion({
      fixture: fixtures.apiVersion({version: 'v3', locale: 'fr'}),
    });

    let page = render(<HelloWorldPage/>);
    await global.nextTick();

    t.equal(page.getByTestId('api-version').textContent, 'v3');
    t.equal(page.getByTestId('api-locale').textContent, 'fr');
  });
});
