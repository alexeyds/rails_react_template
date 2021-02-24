import jutest from "test/browser_jutest";
import React from "react";
import { fetchAPIResponse, validationError } from "support/fetch";
import Remote from "remote/remote";
import { render } from "support/react_renderer";
import { RemoteForm, Field } from "remote_form";

jutest("Remote form Field", s => {
  let remote = Remote.initialize();

  s.test("renders children", t => {
    let container = render(
      <RemoteForm remote={remote}>
        <Field name="test"><div test-id="foobar"/></Field>
      </RemoteForm>
    );

    t.assert(container.queryByTestId('foobar'));
  });

  s.test("renders label", t => {
    let container = render(<RemoteForm remote={remote}><Field name="test" label="My label"/></RemoteForm>);
    t.assert(container.queryByText('My label'));
  });

  s.test("renders field errors", async t => {
    let response = await fetchAPIResponse(validationError({ details: { name: ['invalid'] } }));
    let container = render(<RemoteForm remote={remote.loaded(response)}><Field name="name"/></RemoteForm>);

    t.assert(container.queryByText('invalid'));
  });
});
