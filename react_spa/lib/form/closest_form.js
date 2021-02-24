import { createContext, useContext } from "react";
import { dig } from "utils/object";

export default class ClosestForm {
  constructor({ register, name=null, defaultValues={} }) {
    this.register = register;
    this.name = name;
    this._defaultValues = defaultValues;
  }

  getInputProps(props) {
    let inputName = props.name;

    let name = this.getInputName(inputName);
    let defaultValue = props.value === undefined ? this.getDefaultValue(inputName) : undefined;

    return { ...props, ref: this.register, name, defaultValue };
  }

  getInputName(inputName) {
    return this.name ? `${this.name}[${inputName}]` : inputName;
  }

  getDefaultValue(inputName) {
    return dig(this._defaultValues, inputName);
  }

  extractSubmittedData(data) {
    return this.name ? data[this.name] : data;
  }
}

export let ClosestFormContext = createContext();

export let useClosestForm = () => useContext(ClosestFormContext);
