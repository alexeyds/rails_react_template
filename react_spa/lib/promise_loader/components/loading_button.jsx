import React from "react";
import { STATES } from "promise_loader/states";
import { addClass } from "utils/css";

export default function LoadingButton({promiseLoader, children, ...props}) {
  if (promiseLoader.state === STATES.loading) {
    let className = addClass(props.className, 'is-loading');
    return <button {...props} className={className} disabled={true}>{children}</button>;
  } else {
    return <button {...props}>{children}</button>;
  }
}