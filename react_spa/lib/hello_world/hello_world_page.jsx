import React, { useEffect } from "react";
import { usePromiseLoader } from "promise_loader";
import resources from "remote/resources";

export default function HelloWorldPage() {
  let [promiseLoader, loadPromise] = usePromiseLoader(resources.helloWorld.getApiVersion);
  useEffect(() => loadPromise(), [loadPromise]);

  return (
    <div style={{textAlign: 'center'}}>
      <ResponseDetails promiseLoader={promiseLoader}/>
    </div>
  );
}

function ResponseDetails({promiseLoader}) {
  if (promiseLoader.result) {
    let responseBody = promiseLoader.result.body;

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