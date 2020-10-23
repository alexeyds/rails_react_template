import test from "test/browser_tape";
import React from "react";
import { render } from "test/support/react_renderer";
import HelloWorldPage from "hello_world/hello_world_page";

test("HelloWorldPage", function(t) {
  t.test("foobar", function(t) {
    t.test("fetches api version", async function(t) {
      let response = { body: JSON.stringify({api_version: 'v1', locale: 'en', details: 'Hello world'}) };
      fetch.mock('/api/v1/hello_world', { response });

      let page = render(<HelloWorldPage/>);

      t.false(page.queryByTestId('api-version'));
      await fetch.nextTick();
      t.equal(page.getByTestId('api-version').textContent, 'v1');
      t.equal(page.getByTestId('api-locale').textContent, 'en');
    });
  });
});
