import jutest from "test/browser_jutest";
import React from "react";
import request from "remote/request";
import { fixtures } from "remote_expectations";
import expect from "remote_expectations/expect";
import { render } from "test/support/react_renderer";
import { Remote } from "remote";
import { FormField } from "remote/components";

jutest("Remote/FormField", s => {
  s.test("renders normal field if Remote has no errors", t => {
    let content = render(<FormField remote={Remote.loading()} name='email'><input test-id='email-input'/></FormField>);
    t.assert(content.queryByTestId('email-input'));
  });

  s.test("renders field errors", async t => {
    let body = fixtures.errors.flowError({ details: { email: 'is taken' } });
    expect("/test", { response: { body, status: 422 } });
    let remote = await request('/test').then(Remote.loaded);
    let content = render(<FormField remote={remote} name='email'><input test-id='email-input'/></FormField>);

    t.assert(content.queryByText('is taken'));
  });
});
