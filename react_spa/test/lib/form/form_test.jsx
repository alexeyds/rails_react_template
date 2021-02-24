import jutest from "test/browser_jutest";
import React from "react";
import { sendForm } from "support/named_form_helpers";
import { renderHook, current } from "support/hooks_renderer";
import { render } from "support/react_renderer";
import { Form, useClosestForm, Input } from "form";

jutest("Form", s => {
  s.describe("rendering", s => {
    s.test("renders form", t => {
      let container = render(<Form/>);
      let form = container.queryByTag('form');

      t.assert(form);
      t.equal(form.name, '');
    });

    s.test("renders children", t => {
      let container = render(<Form><div test-id='foobar'/></Form>);
      t.assert(container.queryByTestId('foobar'));
    });

    s.test("sets form name", t => {
      let container = render(<Form name='user'/>);
      t.assert(container.getByTag('form').name, 'user');
    });

    s.test("delegates custom props to form element", t => {
      let container = render(<Form className='custom'/>);
      let form = container.queryByTag('form');

      t.equal(form.className, 'custom');
    });
  });

  s.describe("context", s => {
    let closestFormHook = (opts) => {      
      let wrapper = ({children}) => <Form {...opts}>{children}</Form>;
      return renderHook(() => useClosestForm(), { wrapper });
    };

    s.test("provides ClosestForm", t => {
      let closestForm = current(closestFormHook());

      t.equal(closestForm.getInputName('name'), 'name');
      t.equal(closestForm.getDefaultValue('name'), undefined);
    });

    s.test("initializes closest form with delegated values", t => {
      let closestForm = current(closestFormHook({name: 'user', defaultValues: { name: 'John' }}));

      t.equal(closestForm.getInputName('name'), 'user[name]');
      t.equal(closestForm.getDefaultValue('name'), 'John');
    });
  });

  s.describe("submission", s => {
    s.test("calls onSubmit with form data handler", async t => {
      let submittedData;

      let container = render(
        <Form name='login' onSubmit={data => submittedData = data}>
          <Input name='email'/>
          <Input name='password'/>
        </Form>
      );

      let params = { email: 'foo@bar.com', password: '1234' };
      await sendForm(container, 'login', params);

      t.same(submittedData, params);
    });
  });
});
