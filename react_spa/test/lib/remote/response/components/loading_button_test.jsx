import jutest from "test/browser_jutest";
import React from "react";
import { render, within } from "test/support/react_renderer";
import { Response } from "remote/response";
import { LoadingButton } from "remote/response/components";

jutest("response LoadingButton", s => {
  s.test("renders normal <button> if response is not loading", t => {
    let container = render(
      <LoadingButton response={Response.initial()} test-id='my-button' className='test'>
        <span test-id='button-content'/>
      </LoadingButton>
    );

    let button = container.getByTestId('my-button');
    t.assert(within(button).queryByTestId('button-content'));
    t.equal(button.className, 'test');
  });

  s.test("renders disabled button if response is loading", t => {
    let container = render(
      <LoadingButton response={Response.loading()} test-id='my-button'/>
    );

    let button = container.getByTestId('my-button');
    t.equal(button.disabled, true);
    t.equal(button.className, 'is-loading');
  });
});
