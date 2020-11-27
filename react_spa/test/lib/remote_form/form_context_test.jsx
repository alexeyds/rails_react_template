import jutest from "test/browser_jutest";
import React, { useState } from "react";
import { renderHook, current } from "test/support/hooks_renderer";
import { useFormContext, FormContext } from "remote_form/form_context";

jutest("remote_form/FormContext", s => {
  s.test("provides context for {error, response}", t => {
    let wrapper = ({children}) => <FormContext request={'foobar'} errors={'errors'}>{children}</FormContext>;
    let hook = renderHook(() => useFormContext(), { wrapper });
    let { errors, request } = current(hook);

    t.equal(request, 'foobar');
    t.equal(errors, 'errors');
  });

  s.test("memoizes resulting object", t => {
    let changeState;
    let Wrapper = ({children}) => {
      let [, setState] = useState(123);
      changeState = setState;
      return <FormContext>{children}</FormContext>;
    };

    let hook = renderHook(() => useFormContext(), { wrapper: Wrapper });
    let oldContext = current(hook);
    changeState();
    let newContext = current(hook);

    t.equal(oldContext, newContext);
  });
});
