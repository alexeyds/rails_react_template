import jutest from "test/browser_jutest";
import React from "react";
import { render } from "support/react_renderer";
import { Form, Input, Select, TextArea } from "form";

jutest("form/inputs", s => {
  s.test("contains Input component", t => {
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

  s.test("contains Select component", t => {
    let container = render(
      <Form name='user' defaultValues={{role: 'admin'}}>
        <Select name='role' required>
          <option value='admin'/>
        </Select>
      </Form>
    );
    let select = container.queryByTag('select');

    t.equal(select.name, 'user[role]');
    t.equal(select.value, 'admin');
    t.equal(select.required, true);
  });

  s.test("contains TextArea component", t => {
    let container = render(
      <Form name='post'>
        <TextArea name='description' required/>
      </Form>
    );
    let textarea = container.queryByTag('textarea');

    t.equal(textarea.name, 'post[description]');
    t.equal(textarea.required, true);
  });
});
