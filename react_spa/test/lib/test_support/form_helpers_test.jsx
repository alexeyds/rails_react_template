import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { changeInput, fillForm, getInputValue, getInput, submitForm, sendForm } from "test/support/form_helpers";

jutest("form_helpers", s => {
  function getForm(elements) {
    return render(elements).getByTag('form');
  }

  s.describe("getInput()", s => {
    s.test("returns matching input element", t => {
      let form = getForm(
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
      let form = getForm(<form><input name="email" defaultValue="foo"/></form>);
      t.equal(getInputValue(form, "email"), "foo");
    });

    s.test("converts checkbox value to boolean", t => {
      let form = getForm(<form><input name="ok" type="checkbox" defaultChecked={true}/></form>);
      t.equal(getInputValue(form, "ok"), true);
    });
  });

  s.describe("changeInput()", s => {
    s.test("changes input's value", t => {
      let form = getForm(<form><input name="email"/></form>);
      let email = "foo@bar.com";
      changeInput(form, "email", email);

      t.equal(getInputValue(form, "email"), email);
    });

    s.test("changes checkbox's value", t => {
      let form = getForm(<form><input type="checkbox" name="agreement"/></form>);
      changeInput(form, "agreement", true);

      t.equal(getInputValue(form, "agreement"), true);      
    });
  });

  s.describe("fillForm()", s => {
    s.test("changes values of each input within the form", t => {
      let form = getForm(<form><input name="name"/><input name="surname"/></form>);
      fillForm(form, {name: "foo", surname: "bar"});

      t.equal(getInputValue(form, "name"), "foo");
      t.equal(getInputValue(form, "surname"), "bar");
    });
  });

  s.describe("submitForm()", s => {
    s.test("submits form", t => {
      let isSubmitted = false;
      let form = getForm(<form onSubmit={() => isSubmitted = true}/>);
      submitForm(form);

      t.equal(isSubmitted, true);
    });
  });

  s.describe("sendForm()", s => {
    s.test("fills and submits form", t => {
      let isSubmitted = false;
      let form = getForm(<form onSubmit={() => isSubmitted = true}><input name="name"/></form>);
      sendForm(form, { name: 'foo' });

      t.equal(getInputValue(form, "name"), "foo");
      t.equal(isSubmitted, true);
    });
  });
});
