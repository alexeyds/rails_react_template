import jutest from "test/browser_jutest";
import React from "react";
import { render } from "support/react_renderer";
import { changeInput, fillForm, getInputValue, getInput, submitForm, sendForm } from "support/named_form_helpers";

jutest("named_form_helpers", s => {
  s.describe("getInput()", s => {
    s.test("returns matching input element", t => {
      let form = render(
        <form>
          <input name="email" defaultValue="foo"/>
          <input name='surname'/>
        </form>
      );

      t.equal(getInput(form, "email").value, "foo");
    });
  });

  s.describe("getInputValue()", s => {
    s.test("returns input's value", t => {
      let form = render(<form><input name="email" defaultValue="foo"/></form>);
      t.equal(getInputValue(form, "email"), "foo");
    });

    s.test("converts checkbox value to boolean", t => {
      let form = render(<form><input name="ok" type="checkbox" defaultChecked={true}/></form>);
      t.equal(getInputValue(form, "ok"), true);
    });
  });

  s.describe("changeInput()", s => {
    s.test("changes input's value", t => {
      let form = render(<form><input name="email"/></form>);
      let email = "foo@bar.com";
      changeInput(form, "email", email);

      t.equal(getInputValue(form, "email"), email);
    });

    s.test("changes checkbox's value", t => {
      let form = render(<form><input type="checkbox" name="agreement"/></form>);
      changeInput(form, "agreement", true);

      t.equal(getInputValue(form, "agreement"), true);      
    });
  });

  s.describe("fillForm()", s => {
    s.test("changes values of each input within the form", t => {
      let form = render(<form name='user'><input name="user[name]"/><input name="user[surname]"/></form>);
      fillForm(form, "user", {name: "foo", surname: "bar"});

      t.equal(getInputValue(form, "user[name]"), "foo");
      t.equal(getInputValue(form, "user[surname]"), "bar");
    });
  });

  s.describe("submitForm()", s => {
    s.test("submits form with matching name", t => {
      let isSubmitted = false;
      let form = render(
        <div>
          <form name='order' onSubmit={() => isSubmitted = true}/>
          <form name='user' onSubmit={() => isSubmitted = 'wrong form'}/>
        </div>);
      submitForm(form, 'order');

      t.equal(isSubmitted, true);
    });
  });

  s.describe("sendForm()", s => {
    s.test("fills and submits form", t => {
      let isSubmitted = false;
      let form = render(<form name='user' onSubmit={() => isSubmitted = true}><input name="user[name]"/></form>);
      sendForm(form, 'user', { name: 'foo' });

      t.equal(getInputValue(form, "user[name]"), "foo");
      t.equal(isSubmitted, true);
    });
  });
});
