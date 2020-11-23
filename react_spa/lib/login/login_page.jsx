import React from "react";
import { Redirect } from "react-router";
import api from "api/resources";
import routes from "application/routes";
import { useForm } from 'react-hook-form';
import { useStore } from "effector-react";
import { sessionStore, updateSessionFromCookie } from "current_session/session_store";

export default function LoginPage() {
  let session = useStore(sessionStore);
  let { register, handleSubmit } = useForm();
  let onSubmit = (data) => {
    api.sessions.create(data).then(() => updateSessionFromCookie());
  };

  if (session) {
    return <Redirect to={routes.rootPath()}/>;
  } else {
    return (
      <div test-id="login-page">
        <form onSubmit={handleSubmit(onSubmit)} test-id='login-form'>
          <input name="email" ref={register}/>
          <input name="password" ref={register}/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}