import React, { useEffect } from "react";
import useFetchData from "use_fetch_data";
import { fetchJSON } from "improved_fetch";

export default function HelloWorldPage() {
  let [userData, userActions] = useFetchData();

  useEffect(() => {
    userActions.handleRequestPromise(fetchJSON('/api/v1/hello_world'), { bodyParser: r => r.json() });
  }, [userActions]);

  return (
    <div style={{textAlign: 'center'}}>
      <ResponseDetails userData={userData}/>
    </div>
  ); 
}

function ResponseDetails({userData}) {
  if (userData.isLoading) {
    return <span>Running `GET /api/v1/hello_world`...</span>;
  } else {
    let responseBody = userData.parsedBody;

    return (
      <div>
        <div>API version: <span test-id='api-version'>{responseBody.api_version}</span></div>
        <div>API locale: <span test-id='api-locale'>{responseBody.locale}</span></div>
        <div>Details: <span>{responseBody.details}</span></div>
      </div>
    );
  }
}