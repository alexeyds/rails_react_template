import React, { useEffect } from "react";
import useFetchingState from "utils/hooks/use_fetching_state";
import { fetchJSON } from "improved_fetch";

export default function HelloWorldPage() {
  let [helloWorldState, helloWorldActions] = useFetchingState();

  useEffect(() => {
    helloWorldActions.handleRequestPromise(fetchJSON('/api/v1/hello_world'), { bodyParser: r => r.json() });
  }, [helloWorldActions]);

  return (
    <div style={{textAlign: 'center'}}>
      <ResponseDetails helloWorldState={helloWorldState}/>
    </div>
  );
}

function ResponseDetails({helloWorldState}) {
  if (helloWorldState.isLoading) {
    return <span>Running `GET /api/v1/hello_world`...</span>;
  } else {
    let responseBody = helloWorldState.parsedBody;

    return (
      <div>
        <div>API version: <span test-id='api-version'>{responseBody.api_version}</span></div>
        <div>API locale: <span test-id='api-locale'>{responseBody.locale}</span></div>
        <div>Details: <span>{responseBody.details}</span></div>
      </div>
    );
  }
}
