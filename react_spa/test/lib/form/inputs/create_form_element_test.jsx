import jutest from "test/browser_jutest";
import React from "react";
import { render } from "support/react_renderer";
import { Form } from "form";
import createFormElement from "form/inputs/create_form_element";

jutest("createFormElement", s => {
  s.test("returns element component", t => {
    let Input = createFormElement({tag: 'input'});
    let container = render(<Form><Input name='email'/></Form>);
    let input = container.queryByTag('input');

    t.assert(input);
    t.equal(input.name, 'email');
  });

  s.test("uses ClosestForm for props", t => {
    let Input = createFormElement({tag: 'input'});
    let container = render(
      <Form name='user' defaultValues={{name: 'John'}}>
        <Input name='name' required/>
      </Form>
    );
    let input = container.queryByTag('input');

    t.equal(input.name, 'user[name]');
    t.equal(input.value, 'John');
    t.equal(input.required, true);
  });
});
