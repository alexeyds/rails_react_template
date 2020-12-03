import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { Remote } from "remote";
import { ErrorMessage } from "remote/components";

jutest("Remote/ErrorMessage", s => {
  s.test("renders nothing if Remote is not errored", t => {
    let content = render(<ErrorMessage remote={Remote.initial()} test-id='my-error'/>);
    t.refute(content.queryByTestId('my-error'));
  });

  s.test("renders error message is not errored", t => {
    let error = new Error('Network error');
    let content = render(<ErrorMessage remote={Remote.rejected(error)} test-id='my-error'/>);

    let myError = content.queryByTestId('my-error');
    t.assert(myError);
    t.match(myError.textContent, /Network error/);
  });
});
