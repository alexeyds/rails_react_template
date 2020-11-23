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
      <section className="hero has-background-black-ter is-fullheight guest-hero" test-id="login-page">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-two-fifths">
                <div className="box login-box">
                  <div className="has-text-centered mb-4">
                    <h2 className="title">Rails-React Template</h2>
                  </div>
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

                    <div className="field is-flex is-justify-content-space-between">
                      <div><a>Forgot password?</a></div>
                      <div className="control">
                        <button type="submit" className="button is-info">
                          <span className="icon is-small">
                            <i className="fas fa-key"></i>
                          </span>
                          <span>Log In</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
