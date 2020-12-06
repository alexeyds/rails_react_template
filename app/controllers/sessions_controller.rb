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
    Sessions::PublicSessionCookie.update(cookies, session: session)
    render json: { current_session: SessionSerializer.render(session) }
  end
end
