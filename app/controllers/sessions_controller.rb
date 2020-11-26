class SessionsController < ApplicationController
  def current
    render_session(session_manager.current_session)
  end

  def create
    result = Sessions::AuthenticateUser.new.call(params)

    process_dry_monad_result(result) do |user|
      render_session(session_manager.create_session(user: user))
    end
  end

  def destroy
    session_manager.destroy_session
    render_session(nil)
  end

  private

  def render_session(session)
    update_public_session_cookie(session)
    render json: { current_session: serialize_session(session) }
  end

  def update_public_session_cookie(session)
    if session
      cookies[:current_session] = {
        value: serialize_session(session).to_json,
        httponly: false,
        expires: session.expires_at,
        same_site: :lax
      }
    else
      cookies.delete(:current_session)
    end
  end

  def serialize_session(session)
    session && SessionSerializer.render(session)
  end
end
