import jutest from "test/browser_jutest";
import React from "react";
import Remote from "remote/remote";
import { render } from "support/react_renderer";
import { RemoteForm, Submit } from "remote_form";

jutest("Remote form Submit", s => {
  let remote = Remote.initialize();

  s.test("renders submit button", t => {
    let container = render(<RemoteForm remote={remote}><Submit className='button'/></RemoteForm>);

    let button = container.queryByTag('button');
    t.equal(button.type, 'submit');
    t.equal(button.className, 'button');
  });

  s.test("handles loading remotes", t => {
    let container = render(<RemoteForm remote={remote.loading()}><Submit/></RemoteForm>);

    let button = container.queryByTag('button');
    t.equal(button.disabled, true);
  });
});
