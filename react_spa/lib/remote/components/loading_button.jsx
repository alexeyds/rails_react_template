import React from "react";
import { Remote } from "remote";
import { addClass } from "utils/css";

export default function LoadingButton({remote, children, ...props}) {
  if (remote.state === Remote.STATES.loading) {
    let className = addClass(props.className, 'is-loading');
    return <button {...props} className={className} disabled={true}>{children}</button>;
  } else {
    return <button {...props}>{children}</button>;
  }
}