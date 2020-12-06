class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate_user
    unless current_session
      Sessions::PublicSessionCookie.update(cookies, session: nil)
      render_interaction_error(InteractionErrors.authentication_error)
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
    render json: { error: error }, status: interaction_error_status(error)
  end

  def interaction_error_status(error)
    types = InteractionErrors::Types

    case error[:type]
    when types.authentication_error
      401
    when types.not_found_error
      404
    when types.authorization_error
      403
    else
      422
    end
  end
end
