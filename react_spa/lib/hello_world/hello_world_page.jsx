import React, { useEffect } from "react";
import { useRemoteLoader } from "remote_loader";
import resources from "remote/resources";

export default function HelloWorldPage() {
  let [remoteLoader, loadRemote] = useRemoteLoader(resources.helloWorld.getApiVersion);
  useEffect(() => loadRemote(), [loadRemote]);

  return (
    <div style={{textAlign: 'center'}}>
      <ResponseDetails remoteLoader={remoteLoader}/>
    </div>
  );
}

function ResponseDetails({remoteLoader}) {
  if (remoteLoader.isLoaded) {
    let responseBody = remoteLoader.response.body;

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
