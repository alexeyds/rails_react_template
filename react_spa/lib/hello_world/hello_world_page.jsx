import React, { useEffect } from "react";
import { useRemoteRequest, states } from "remote_request";
import api from "api_client/resources";
import UserLayout from "layouts/user_layout";

export default function HelloWorldPage() {
  let [request, executeRequest] = useRemoteRequest(api.helloWorld.getApiVersion);
  useEffect(() => executeRequest(), [executeRequest]);

  return (
    <UserLayout>
      <div style={{textAlign: 'center'}}>
        <ResponseDetails request={request}/>
      </div>
    </UserLayout>
  );
}

function ResponseDetails({request}) {
  if (request.state === states.loaded) {
    let responseBody = request.response.body;

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