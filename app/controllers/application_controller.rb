class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate_user
    result = Auth::AuthenticateUser.new.call(current_user)

    if result.failure?
      Sessions::PublicSessionCookie.update(cookies, session: nil) 
      process_interaction_result(result)
      false
    else
      true
    end
  end

  def current_session
    @current_session ||= session_manager.current_session
  end

  def current_user
    current_session&.user
  end

  def session_manager
    Sessions::SessionManager.new(session)
  end

  def process_interaction_result(result)
    result.either(
      ->(data) { yield data },
      ->(failure) { render_interaction_error(failure) }
    )
  end

  def render_interaction_error(error)
    render json: { error: error }, status: InteractionErrors.http_status(error)
  end
end
