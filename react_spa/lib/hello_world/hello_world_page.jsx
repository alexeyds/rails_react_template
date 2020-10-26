import React, { useState, useEffect } from "react";

export default function HelloWorldPage() {
  const [responseBody, setResponseBody] = useState(null);
 
  useEffect(() => {
    fetch('/api/v1/hello_world', { headers: {'Content-Type': 'application/json'} })
      .then(r => r.json())
      .then(setResponseBody);
  }, [setResponseBody]);

  return (
    <div style={{textAlign: 'center'}}>
      <ResponseDetails responseBody={responseBody}/>
    </div>
  ); 
}

function ResponseDetails({responseBody}) {
  if (responseBody) {
    return (
      <div>
        <div>API version: <span test-id='api-version'>{responseBody.api_version}</span></div>
        <div>API locale: <span test-id='api-locale'>{responseBody.locale}</span></div>
        <div>Details: <span>{responseBody.details}</span></div>
      </div>
    );
  } else {
    return <span>Running `GET /api/v1/hello_world`...</span>;
  }
}