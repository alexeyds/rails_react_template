import jutest from "test/browser_jutest";
import React from "react";
import api from "api_client/resources";
import { expectations } from "api_expectations/sessions";
import { render } from "test/support/react_renderer";
import ResponseErrorMessage from "errors/response_error_message";

jutest("ResponseErrorMessage", s => {
  s.test("renders nothing if response is null", t => {
    let message = render(<ResponseErrorMessage response={null}/>);
    t.refute(message.queryByTag('span'));
  });

  s.test("renders error message", async t => {
    expectations.expectLoginError({message: 'foobar'});
    let response = await api.sessions.create({});
    let message = render(<ResponseErrorMessage response={response}/>);
    t.assert(message.queryByText('foobar'));
  });
});
