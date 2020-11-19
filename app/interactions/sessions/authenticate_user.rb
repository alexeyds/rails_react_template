module Sessions
  class AuthenticateUser
    include Dry::Monads[:result, :do]
    include Validations
    include InteractionErrors

    def call(params)
      user = yield find_user(params)
      yield validate_password(params, user: user)

      Success(user)
    end

    private

    def find_user(params)
      yield validate_presence(params, [:email])
      user = yield validate_record_exists(params, param: :email, query: User, search_by: :email)

      Success(user)
    end

    def validate_password(params, user:)
      if user.authenticate(params[:password])
        Success(true)
      else
        error = InteractionErrors.validation_error(
          message: I18n.t(:invalid_password, scope: 'sessions.error_messages'),
          details: { password: :invalid }
        )
        Failure(error)
      end
    end
  end
end