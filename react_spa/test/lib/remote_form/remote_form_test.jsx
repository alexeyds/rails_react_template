import jutest from "test/browser_jutest";
import React  from "react";
import { render } from "test/support/react_renderer";
import RemoteForm from "remote_form";
import { useFormContext } from "remote_form/form_context";

jutest("RemoteForm", s => {
  s.test("renders children", t => {
    let result = render(<RemoteForm><div test-id='foobar'/></RemoteForm>);
    t.assert(result.queryByTestId('foobar'));
  });

  s.test("allows children to use form context", t => {
    let context;
    function ContextUser() {
      context = useFormContext();
      return null;
    }

    render(<RemoteForm request={'request'} errors={'errors'}><ContextUser/></RemoteForm>);

    t.equal(context.errors, 'errors');
    t.equal(context.request, 'request');
  });
});
