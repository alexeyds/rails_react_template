import { nextTick } from "test/support/application";
import { fireEvent, within } from "test/support/react_renderer";

export function getInputValue(form, name) {
  let input = getInput(form, name);

  if (input.type === "checkbox") {
    return input.checked;
  } else {
    return input.value;
  }
}

export function changeInput(form, name, value) {
  let input = getInput(form, name);
  let event;

  if (input.type === "checkbox") {
    event = {target: {checked: !!value}};
  } else {
    event = {target: {value}};
  }

  fireEvent.change(input, event);
  return value;
}

export function sendForm(form, values) {
  fillForm(form, values);
  submitForm(form);
  return nextTick();
}

export function fillForm(form, values) {
  Object.entries(values).forEach(([name, value]) => {
    changeInput(form, name, value);
  });
}

export function submitForm(form) {
  fireEvent.submit(form);
}

export function getInput(form, name) {
  return within(form).getByName(name);
}
