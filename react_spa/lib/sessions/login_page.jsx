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
      <div className="row mb-4">
        <div className="col">
          <div className="login-box shadow">
            <h2 className="font-weight-bold mb-3 text-center">Rails-React Template</h2>
            <RemoteForm remote={remote} onSubmit={createSession} name='session'>
              <Field name='email'>
                <div className="input-group">
                  <Input className="form-control" type="email" required autoFocus placeholder="user@example.com" name="email"/>
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                </div>
              </Field>

              <Field name='password'>
                <div className="input-group">
                  <Input className="form-control" type="password" required placeholder="********" name="password"/>
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                  </div>
                </div>
              </Field>

              <Submit className="btn btn-primary btn-lg btn-block">
                <span>Log In</span>
                {' '}
                <span><i className="fas fa-key"></i></span>
              </Submit>
            </RemoteForm>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <a className="text-secondary">Forgot password?</a>
        </div>
      </div>
    </GuestLayout>
  );
}