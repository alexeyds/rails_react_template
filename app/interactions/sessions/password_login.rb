module Sessions
  class PasswordLogin
    class Contract < Validations::ApplicationContract
      params do
        required(:email).filled(Validations::CustomTypes::Email)
        required(:password).filled(:string)
      end
    end

    include Dry::Monads[:result, :do]

    def call(params)
      data = yield Contract.new.validate_params(params)
      user = yield find_user(data[:email])
      yield validate_password(user, data[:password])

      Success(Session.create!(user: user, expires_at: 2.weeks.from_now))
    end

    private

    def find_user(email)
      user = User.find_by(email: email)
      user ? Success(user) : Failure(not_found_error)
    end

    def validate_password(user, password)
      user.authenticate(password) ? Success(true) : Failure(not_found_error)
    end

    def not_found_error
      InteractionErrors.flow_error(message: I18n.t("sessions.errors.invalid_login_or_password"))
    end
  end
end
