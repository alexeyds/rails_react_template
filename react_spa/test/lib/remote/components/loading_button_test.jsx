import jutest from "test/browser_jutest";
import React from "react";
import { render } from "support/react_renderer";
import Remote from "remote/remote";
import { LoadingButton } from "remote/components";

jutest("LoadingButton", s => {
  s.test("renders normal <button> if remote is not loading", t => {
    let container = render(
      <LoadingButton remote={Remote.initialize()} test-id='my-button' className='test'>
        <span test-id='button-content'/>
      </LoadingButton>
    );

    let button = container.getByTestId('my-button');
    t.assert(container.queryByTestId('button-content'));
    t.equal(button.className, 'test');
  });

  s.test("renders disabled button if remote is loading", t => {
    let container = render(
      <LoadingButton remote={Remote.initialize().loading()} test-id='my-button'/>
    );

    let button = container.getByTestId('my-button');
    t.equal(button.disabled, true);
  });
});
