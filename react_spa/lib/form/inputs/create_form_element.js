import React from "react";
import { useClosestForm } from "form/closest_form";

export default function createFormElement({tag}) {
  return function FormElement(props) {
    let closestForm = useClosestForm();
    return React.createElement(tag, closestForm.getInputProps(props));
  };
}