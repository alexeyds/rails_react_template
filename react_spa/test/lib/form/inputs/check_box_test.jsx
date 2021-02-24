import jutest from "test/browser_jutest";
import React from "react";
import { render } from "support/react_renderer";
import { Form, CheckBox } from "form";

jutest("form/CheckBox", s => {
  s.test("renders checkbox", t => {
    let container = render(
      <Form name='registration'>
        <CheckBox name='agreement'/>
      </Form>
    );

    let checkBox = container.queryByTag('input');
    t.equal(checkBox.name, 'registration[agreement]');
    t.equal(checkBox.type, 'checkbox');
    t.equal(checkBox.checked, false);
  });

  s.test("sets defaultChecked instead of defaultValue", t => {
    let container = render(
      <Form defaultValues={{agreement: true}}>
        <CheckBox name='agreement'/>
      </Form>
    );

    let checkBox = container.queryByTag('input');
    t.equal(checkBox.checked, true);
  });
});
