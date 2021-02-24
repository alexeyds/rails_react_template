import nextTick from "support/next_tick";
import { fireEvent } from "support/react_renderer";

export function getInputValue(content, name) {
  let input = getInput(content, name);

  if (input.type === "checkbox") {
    return input.checked;
  } else {
    return input.value;
  }
}

export function changeInput(content, name, value) {
  let input = getInput(content, name);
  let event;

  if (input.type === "checkbox") {
    event = {target: {checked: !!value}};
  } else {
    event = {target: {value}};
  }

  fireEvent.change(input, event);
  return value;
}

export function sendForm(content, formName, values) {
  fillForm(content, formName, values);
  submitForm(content, formName);
  return nextTick();
}

export function fillForm(content, formName, values) {
  Object.entries(values).forEach(([name, value]) => {
    changeInput(content, `${formName}[${name}]`, value);
  });
}

export function submitForm(content, formName) {
  fireEvent.submit(content.getByName(formName));
}

export function getInput(content, name) {
  return content.getByName(`'${name}'`);
}
