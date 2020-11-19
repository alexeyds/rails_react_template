module Sessions
  class SessionManager
    def initialize(cookies_session)
      @cookies_session = cookies_session
    end

    def current_session
      session = Session.find_by(id: @cookies_session[id_key])
      session if session && !expired?(session)
    end

    def create_session(user:)
      destroy_session

      session = Session.create!(user: user, expires_at: 2.weeks.from_now)
      @cookies_session[id_key] = session.id
      session
    end

    def destroy_session
      session = Session.find_by(id: @cookies_session[id_key])
      session && session.destroy
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