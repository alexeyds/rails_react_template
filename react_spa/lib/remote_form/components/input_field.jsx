import React from "react";
import Field from "./field";
import { Input } from "form/inputs";

export default function InputField({name, label, ...inputProps}) {
  return (
    <Field label={label} name={name}>
      <div className="control">
        <Input name={name} {...inputProps}/>
      </div>
    </Field>
  );
}
