import jutest from "test/browser_jutest";
import React from "react";
import { render, within } from "test/support/react_renderer";
import { RemoteLoader } from "remote_loader";
import { LoadingButton } from "remote_loader/components";

jutest("promise loader LoadingButton", s => {
  s.test("renders normal <button> if promise is not loading", t => {
    let container = render(
      <LoadingButton remoteLoader={RemoteLoader.initial()} test-id='my-button' className='test'>
        <span test-id='button-content'/>
      </LoadingButton>
    );

    let button = container.getByTestId('my-button');
    t.assert(within(button).queryByTestId('button-content'));
    t.equal(button.className, 'test');
  });

  s.test("renders disabled button if promise is loading", t => {
    let container = render(
      <LoadingButton remoteLoader={RemoteLoader.loading()} test-id='my-button'/>
    );

    let button = container.getByTestId('my-button');
    t.equal(button.disabled, true);
    t.equal(button.className, 'is-loading');
  });
});
