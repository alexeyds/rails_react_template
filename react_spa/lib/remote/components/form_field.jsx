import React from "react";
import { dig } from "utils/object";

export default function FormField({remote, name, children}) {
  let fieldError = findError(remote, name);
  let className = fieldError ? 'field has-errors' : 'field';

  return (
    <div className={className}>
      {children}
      <FieldError error={fieldError}/>
    </div>
  );
}

function findError(remote, fieldName) {
  if (remote.error) {
    return dig(remote.error.details, fieldName);
  } else {
    return null;
  }
}

function FieldError({error}) {
  if (error) {
    return <span className="field-error">{error}</span>;
  } else {
    return null;
  }
}