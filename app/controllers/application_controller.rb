class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_session
    @current_session ||= session_manager.current_session
  end

  def current_user
    current_session&.user
  end

  def session_manager
    Sessions::SessionManager.new(session)
  end

  def process_dry_monad_result(result)
    result.either(
      ->(data) { yield data },
      ->(failure) { render json: { error: failure }, status: 422 }
    )
  end
end
