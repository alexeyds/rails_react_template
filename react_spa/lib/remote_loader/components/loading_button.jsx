import React from "react";
import { addClass } from "utils/css";

export default function LoadingButton({remoteLoader, children, ...props}) {
  if (remoteLoader.isLoading) {
    let className = addClass(props.className, 'is-loading');
    return <button {...props} className={className} disabled={true}>{children}</button>;
  } else {
    return <button {...props}>{children}</button>;
  }
}