module Sessions
  class SessionManager
    def initialize(cookies_session:)
      @cookies_session = cookies_session
    end

    def current_session
      session = Session.find_by(id: @cookies_session[id_key])
      session if session && !expired?(session)
    end

    def current_session=(session)
      expire_current_session
      @cookies_session[id_key] = session.id
    end

    def expire_current_session
      session = current_session
      @cookies_session.delete(:id_key)
      session && session.update!(expires_at: nil)
    end

    private

    def expired?(session)
      session.expires_at ? Time.now.utc > session.expires_at : true
    end

    def id_key
      :_session_manager_session_id
    end
  end
end