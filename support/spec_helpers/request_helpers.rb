module SpecHelpers
  module RequestHelpers
    module SessionsControllerMethods
      def __testonly_sign_in
        session = Session.create!(expires_at: 5.minutes.from_now, user: User.find(params[:user_id]))
        session_manager.current_session = session
        render_session(session)
      end
    end

    def json_body
      JSON.parse(response.body)
    end

    def sign_in(user)
      post '/api/v1/sessions/__testonly_sign_in', params: { user_id: user.id }
    end
  end
end
