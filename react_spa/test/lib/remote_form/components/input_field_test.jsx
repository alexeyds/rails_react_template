import jutest from "test/browser_jutest";
import React from "react";
import { render } from "support/react_renderer";
import Remote from "remote/remote";
import { RemoteForm, InputField } from "remote_form";

jutest("Remote form InputField", s => {
  let remote = Remote.initialize();

  s.test("behaves like Field", async t => {
    let container = render(<RemoteForm remote={remote}><InputField name='name' label='Label text'/></RemoteForm>);
    t.assert(container.queryByText('Label text'));
  });

  s.test("renders input with provided name and delegated props", t => {
    let container = render(<RemoteForm remote={remote}><InputField name='name' required/></RemoteForm>);

    let input = container.queryByTag('input');
    t.assert(input.name, 'name');
    t.equal(input.required, true);
  });
});
