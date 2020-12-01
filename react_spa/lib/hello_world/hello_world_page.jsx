import React, { useEffect } from "react";
import { useResponse } from "remote/response";
import resources from "remote/resources";

export default function HelloWorldPage() {
  let [response, doRequest] = useResponse(resources.helloWorld.getApiVersion);
  useEffect(() => doRequest(), [doRequest]);

  return (
    <div style={{textAlign: 'center'}}>
      <ResponseDetails response={response}/>
    </div>
  );
}

function ResponseDetails({response}) {
  if (response.isSuccess) {
    let responseBody = response.body;

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
