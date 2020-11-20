import React, { useEffect } from "react";
import useAPIRequest from "api/use_api_request";
import api from "api/resources";

export default function HelloWorldPage() {
  let [request, executeRequest] = useAPIRequest(api.helloWorld.getApiVersion);
  useEffect(() => executeRequest(), [executeRequest]);

  return (
    <div style={{textAlign: 'center'}}>
      <ResponseDetails request={request}/>
    </div>
  );
}

function ResponseDetails({request}) {
  if (request.isLoading) {
    return <span>Running `GET /api/v1/hello_world`...</span>;
  } else {
    let responseBody = request.response.body;

    return (
      <div>
        <div>API version: <span test-id='api-version'>{responseBody.apiVersion}</span></div>
        <div>API locale: <span test-id='api-locale'>{responseBody.locale}</span></div>
        <div>Details: <span>{responseBody.details}</span></div>
      </div>
    );
  }
}
