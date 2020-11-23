import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { changeInput, fillForm, inputValue, getInput, submitForm } from "test/support/form_helpers";

jutest("form_helpers", s => {
  s.describe("getInput()", s => {
    s.test("returns matching input element", t => {
      let form = render(
        <div>
          <input name="email" defaultValue="foo"/>
          <input name='surname'/>
        </div>
      );

      t.equal(getInput(form, "email").value, "foo");
    });
  });

  s.describe("inputValue()", s => {
    s.test("returns input's value", t => {
      let form = render(<input name="email" defaultValue="foo"/>);
      t.equal(inputValue(form, "email"), "foo");
    });

    s.test("converts checkbox value to boolean", t => {
      let form = render(<input name="ok" type="checkbox" defaultChecked={true}/>);
      t.equal(inputValue(form, "ok"), true);
    });
  });

  s.describe("changeInput()", s => {
    s.test("changes input's value", t => {
      let form = render(<input name="email"/>);
      let email = "foo@bar.com";
      changeInput(form, "email", email);

      t.equal(inputValue(form, "email"), email);
    });

    s.test("changes checkbox's value", t => {
      let form = render(<input type="checkbox" name="agreement"/>);
      changeInput(form, "agreement", true);

      t.equal(inputValue(form, "agreement"), true);      
    });
  });

  s.describe("fillForm()", s => {
    s.test("changes values of each input within the form", t => {
      let form = render(<form><input name="name"/><input name="surname"/></form>);
      fillForm(form, {name: "foo", surname: "bar"});

      t.equal(inputValue(form, "name"), "foo");
      t.equal(inputValue(form, "surname"), "bar");
    });
  });

  s.describe("submitForm()", s => {
    s.test("submits form", t => {
      let isSubmitted = false;
      let form = render(<form onSubmit={() => isSubmitted = true}/>);
      submitForm(form);

      t.equal(isSubmitted, true);
    });
  });
});
