import React from "react";

export default function ResponseErrorMessage({response}) {
  if (response && response.error) {
    return <span className="has-text-danger">{response.error.message}</span>;
  } else {
    return null;
  }
}