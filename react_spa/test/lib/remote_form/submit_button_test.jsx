import jutest from "test/browser_jutest";
import React from "react";
import * as requestStates from "remote_request/states";
import { render, within } from "test/support/react_renderer";
import RemoteForm, { SubmitButton } from "remote_form";

jutest("remote_form/SubmitButton", s => {
  s.test("renders children and passes all props to <button>", t => {
    let form = render(
      <RemoteForm request={requestStates.initialState()}>
        <SubmitButton test-id='my-button' className='test'>
          <div test-id='button-content'/>
        </SubmitButton>
      </RemoteForm>
    );

    let button = form.getByTestId('my-button');
    t.assert(within(button).queryByTestId('button-content'));
    t.equal(button.className, 'test');
  });

  s.test("renders loading button if request is loading", t => {
    let form = render(
      <RemoteForm request={requestStates.loadingState()}>
        <SubmitButton test-id='my-button'/>
      </RemoteForm>
    );

    let button = form.getByTestId('my-button');
    t.equal(button.disabled, true);
    t.equal(button.className, 'is-loading');
  });
});
