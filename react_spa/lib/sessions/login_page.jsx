import React, { useEffect } from "react";
import GuestLayout from "layouts/guest_layout";
import useRemote from "remote/use_api_remote";
import resources from "api_client/resources";
import { RemoteForm, Input, Field, Submit } from "remote_form";
import { useSessionStore } from "sessions/session_store";

export default function LoginPage() {
  let [remote, createSession] = useRemote(resources.sessions.create);
  let setSession = useSessionStore(s => s.setSession);

  useEffect(() => {
    if (remote.isSuccess) setSession(remote.response.body.currentSession);
  }, [remote, setSession]);

  return (
    <GuestLayout>
      <div className="container" test-id="login-page">
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="box login-box">
              <h2 className="title mb-5 has-text-centered">Rails-React Template</h2>
              <RemoteForm remote={remote} onSubmit={createSession} name='session'>
                <Field name='email'>
                  <div className="control has-icons-right">
                    <Input className="input" type="email" required autoFocus placeholder="user@example.com" name="email"/>
                    <span className="icon is-small is-right"><i className="fas fa-user"></i></span>
                  </div>
                </Field>

                <Field name='password'>
                  <div className="control has-icons-right">
                    <Input className="input" type="password" required placeholder="********" name="password"/>
                    <span className="icon is-small is-right"><i className="fas fa-lock"></i></span>
                  </div>
                </Field>

                <Submit className="button is-block is-info is-medium is-fullwidth">
                  <span>Log In</span>
                  <span className="icon is-small"> <i className="fas fa-key"></i></span>
                </Submit>
              </RemoteForm>
            </div>

            <p className="has-text-link-white has-text-centered">
              <a className="is-white">Forgot password?</a> 
            </p>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}