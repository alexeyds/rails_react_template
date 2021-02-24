import React from "react";
import { useClosestForm } from "form/closest_form";

export function CheckBox(defaultProps) {
  let closestForm = useClosestForm();

  let props = closestForm.getInputProps(defaultProps);
  props.defaultChecked = props.defaultValue;
  delete props.defaultValue;

  return (
    <input type='checkbox' {...props}/>
  );
}
