import React, { useEffect } from "react";
import UserLayout, { sidebarSections } from "layouts/user_layout";
import { ErrorMessage } from "remote/components";
import { useRemote, resources } from "remote";

export default function HelloWorldPage() {
  return (
    <UserLayout activeSidebarSection={sidebarSections.helloWorld}>
      <HelloWorldRequest/>
    </UserLayout>
  );
}

function HelloWorldRequest() {
  let [remote, doRequest] = useRemote(resources.helloWorld.getApiVersion);
  useEffect(() => doRequest(), [doRequest]);

  return (
    <div style={{textAlign: 'center'}}>
      <ErrorMessage remote={remote}/>
      {remote.success && <ResponseDetails remote={remote}/>}
    </div>
  );
}

function ResponseDetails({remote}) {
  let responseBody = remote.response.body;

  return (
    <div>
      <div>API version: <span test-id='api-version'>{responseBody.apiVersion}</span></div>
      <div>API locale: <span test-id='api-locale'>{responseBody.locale}</span></div>
      <div>Details: <span>{responseBody.details}</span></div>
    </div>
  );
}
