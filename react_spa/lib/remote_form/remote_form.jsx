import React from "react";
import { FormContext } from "remote_form/form_context";

export default function RemoteForm({children, request, errors}) {
  return (
    <FormContext request={request} errors={errors}>
      {children}
    </FormContext>
  );
}