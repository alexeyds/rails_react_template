import React, { useEffect } from "react";
import UserLayout, { sidebarSections } from "layouts/user_layout";
import { useRemote, resources } from "remote";

export default function HelloWorldPage() {
  let [remote, doRequest] = useRemote(resources.helloWorld.getApiVersion);
  useEffect(() => doRequest(), [doRequest]);

  return (
    <UserLayout activeSidebarSection={sidebarSections.helloWorld}>
      <div style={{textAlign: 'center'}}>
        <ResponseDetails remote={remote}/>
      </div>
    </UserLayout>
  );
}

function ResponseDetails({remote}) {
  if (remote.success) {
    let responseBody = remote.response.body;

    return (
      <div>
        <div>API version: <span test-id='api-version'>{responseBody.apiVersion}</span></div>
        <div>API locale: <span test-id='api-locale'>{responseBody.locale}</span></div>
        <div>Details: <span>{responseBody.details}</span></div>
      </div>
    );
  } else {
    return <span>Running `GET /api/v1/hello_world`...</span>;
  }
}
