class SessionSerializer < ApplicationSerializer
  def render(session)
    if session
      {
        user: render_user(session.user),
        expires_at: session.expires_at
      }
    else
      nil
    end
  end

  private

  def render_user(user)
    user.slice(:id, :email)
  end
end
