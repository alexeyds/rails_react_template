import React from "react";

export default function ErrorMessage({remote, ...props}) {
  if (remote.error) {
    return (
      <span className="is-block has-text-centered has-text-danger" {...props}>{remote.error.message}</span>
    );
  } else {
    return null; 
  }
}
