module Sessions
  class PublicSessionCookie
    def self.update(cookies, session:)
      if session
        cookies[:current_session] = {
          value: SessionSerializer.render(session).to_json,
          httponly: false,
          expires: session.expires_at,
          same_site: :lax
        }
      else
        cookies.delete(:current_session)
      end
    end
  end
end