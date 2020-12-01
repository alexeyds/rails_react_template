import React from "react";
import resources from "remote/resources";
import GuestLayout from "layouts/guest_layout";
import { useForm } from 'react-hook-form';
import { useResponse } from "remote/response";
import { LoadingButton } from "remote/response/components";
import { updateSessionFromCookie } from "current_session/session_store";

export default function LoginPage() {
  let { register, handleSubmit } = useForm();
  let [response, createSession] = useResponse(resources.sessions.create);

  let onSubmit = (data) => {
    createSession(data).then(() => updateSessionFromCookie());
  };

  return (
    <GuestLayout>
      <div className="container" test-id="login-page">
        <div className="columns is-centered has-text-centered">
          <div className="column is-4">
            <div className="box login-box">
              <h2 className="title mb-5">Rails-React Template</h2>
              <span className='has-text-danger'>{response.errorMessage}</span>
              <form onSubmit={handleSubmit(onSubmit)} test-id='login-form'>
                <div className="field">
                  <div className="control has-icons-right">
                    <input className="input" type="email" autoFocus placeholder="user@example.com" name="email" ref={register}/>
                    <span className="icon is-small is-right"><i className="fas fa-user"></i></span>
                  </div>
                </div>

                <div className="field">
                  <div className="control has-icons-right">
                    <input className="input" type="password" placeholder="********" name="password" ref={register}/>
                    <span className="icon is-small is-right"><i className="fas fa-lock"></i></span>
                  </div>
                </div>

                <LoadingButton response={response} className="button is-block is-info is-medium is-fullwidth" type="submit">
                  <span>Log In</span>
                  <span className="icon is-small"> <i className="fas fa-key"></i></span>
                </LoadingButton>
              </form>
            </div>

            <p className="has-text-link-white">
              <a className="is-white">Forgot password?</a> 
            </p>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}