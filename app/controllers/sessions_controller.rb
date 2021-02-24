class SessionsController < ApplicationController
  include SpecHelpers::RequestHelpers::SessionsControllerMethods if Rails.env.test?

  def current
    render_session(session_manager.current_session)
  end

  def password
    render_session_result(Sessions::PasswordLogin.new.call(params))
  end

  def destroy
    session_manager.expire_current_session
    render_session(nil)
  end

  private

  def render_session_result(result)
    process_interaction_result(result) do |session|
      session_manager.current_session = session
      render_session(session)
    end
  end

  def render_session(session)
    render json: { current_session: SessionSerializer.render(session) }
  end
end
