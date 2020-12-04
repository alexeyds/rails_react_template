module Sessions
  class AuthenticateUser
    include Dry::Monads[:result, :do]
    include Validations
    include InteractionErrors

    def call(params)
      user = yield validate_user_exists(find_user(params))
      yield validate_password(params, user: user)

      Success(user)
    end

    private

    def find_user(params)
      yield validate_presence(params, [:email])
      user = yield validate_record_exists(params, param: :email, query: User, search_by: :email)

      Success(user)
    end

    def validate_user_exists(find_result)
      if find_result.success?
        find_result
      else
        Failure(error(:user_not_found))
      end
    end

    def validate_password(params, user:)
      if user.authenticate(params[:password])
        Success(true)
      else
        Failure(error(:invalid_password))
      end
    end

    def error(type)
      InteractionErrors.flow_error(
        message: I18n.t(type, scope: 'sessions.error_messages')
      )
    end
  end
end
