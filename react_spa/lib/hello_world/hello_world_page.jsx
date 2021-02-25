import React, { useEffect } from "react";
import UserLayout, { sidebarSections } from "layouts/user_layout";
import resources from "api_client/resources";
import useRemote from "remote/use_api_remote";

export default function HelloWorldPage() {
  return (
    <UserLayout activeSidebarSection={sidebarSections.helloWorld}>
      <HelloWorldRequest/>
    </UserLayout>
  );
}

function HelloWorldRequest() {
  let [remote, doRequest] = useRemote(resources.helloWorld.show);
  useEffect(() => doRequest(), [doRequest]);

  return remote.isSuccess && <ResponseDetails remote={remote}/>;
}

function ResponseDetails({remote}) {
  let responseBody = remote.response.body;

  return (
    <div className='text-center'>
      <div>API version: <span>{responseBody.apiVersion}</span></div>
      <div>API locale: <span>{responseBody.locale}</span></div>
      <div>Details: <span>{responseBody.details}</span></div>
      <div>User: <span>{responseBody.userEmail}</span></div>
    </div>
  );
}
