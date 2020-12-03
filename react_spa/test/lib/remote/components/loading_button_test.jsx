import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { Remote } from "remote";
import { LoadingButton } from "remote/components";

jutest("Remote/LoadingButton", s => {
  s.test("renders normal <button> if remote is not loading", t => {
    let container = render(
      <LoadingButton remote={Remote.initial()} test-id='my-button' className='test'>
        <span test-id='button-content'/>
      </LoadingButton>
    );

    let button = container.getByTestId('my-button');
    t.assert(container.queryByTestId('button-content'));
    t.equal(button.className, 'test');
  });

  s.test("renders disabled button if remote is loading", t => {
    let container = render(
      <LoadingButton remote={Remote.loading()} test-id='my-button'/>
    );

    let button = container.getByTestId('my-button');
    t.equal(button.disabled, true);
    t.equal(button.className, 'is-loading');
  });
});
