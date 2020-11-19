module Sessions
  class SessionSerializer < ApplicationSerializer
    def render(session)
      {
        user: render_user(session.user),
        expires_at: session.expires_at
      }
    end

    private

    def render_user(user)
      user.slice(:id, :email)
    end
  end
end