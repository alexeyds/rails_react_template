import React from "react";
import { useClosestRemote } from "remote/closest_remote";
import { fieldError } from "remote/api_errors";

export default function Field({name, label, children}) {
  let remote = useClosestRemote();
  let error = fieldError(remote, name);

  return (
    <div className={`form-group ${error ? 'has-errors' : ''}`}>
      {label && <label className='label' name={name}>{label}</label>}
      {children}
      {error && <span className="mt-1 text-danger">{error}</span>}
    </div>
  );
}
