module Auth
  class AuthenticateUser
    include Dry::Monads[:result]

    def call(user)
      if user
        Success(true)
      else
        Failure(InteractionErrors.authentication_error)
      end
    end
  end
end