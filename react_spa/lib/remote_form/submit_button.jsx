import React from "react";
import { states } from "remote_request";
import { useFormContext } from "remote_form/form_context";

export default function SubmitButton({children, ...props}) {
  let { request } = useFormContext();

  if (request.state === states.loading) {
    let className = props.className ? `${props.className} is-loading` : 'is-loading';
    return <button {...props} className={className} disabled={true}>{children}</button>;
  } else {
    return <button {...props}>{children}</button>;
  }
}