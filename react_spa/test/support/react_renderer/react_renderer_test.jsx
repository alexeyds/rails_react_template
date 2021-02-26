import jutest from "test/browser_jutest";
import React from "react";
import { render, within, act, fireEvent, userEvent } from "support/react_renderer";

jutest("react_renderer", s => {
  s.test("re-exports stuff from testing-library", t => {
    t.equal(typeof act, "function");
    t.equal(typeof fireEvent, "function");
    t.equal(typeof userEvent, "object");
  });

  s.describe("render()", s => {
    s.test("uses test-id as testId attribute", t => {
      let div = render(<div test-id="foo"/>);

      t.assert(div.getByTestId("foo"));
      t.refute(div.queryByTestId("bar"));
    });

    s.test("has *byTag queries", t => {
      let form = render(<form></form>);

      t.assert(form.getByTag("form"));
      t.refute(form.queryByTag("input"));
    });

    s.test("has *byName queries", t => {
      let input = render(<input name="surname"></input>);

      t.assert(input.getByName("surname"));
      t.refute(input.queryByName("email"));
    });
  });

  s.describe("within()", s => {
    s.test("supports custom queries", t => {
      let form = render(<form><input name="surname"></input></form>);

      let input = within(form.getByTag("form")).queryByName("surname");
      t.assert(input);
    });
  });
});
