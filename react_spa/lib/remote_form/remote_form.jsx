import React from "react";
import { Form } from "form";
import { ClosestRemoteContext } from "remote/closest_remote";
import { errorMessage } from "remote/api_errors";

export default function RemoteForm({remote, children, ...props}) {
  let error = errorMessage(remote);

  return (
    <ClosestRemoteContext.Provider value={remote}>
      <Form {...props}>
        {error && <div className="text-center text-danger mb-2">{error}</div>}
        {children}
      </Form>
    </ClosestRemoteContext.Provider>
  );
}
