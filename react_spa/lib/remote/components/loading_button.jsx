import React from "react";
import { addClass } from "utils/css";

export default function LoadingButton({remote, ...props}) {
  if (remote.isLoading) {
    let className = addClass(props.className, 'is-loading');
    return <button {...props} className={className} disabled={true}/>;
  } else {
    return <button {...props}/>;
  }
}
