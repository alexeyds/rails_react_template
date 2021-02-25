import React from "react";

export default function LoadingButton({remote, ...props}) {
  if (remote.isLoading) {
    return (
      <button {...props} disabled={true}>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>
    );
  } else {
    return <button {...props}/>;
  }
}
