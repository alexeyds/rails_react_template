module Validations
  class ValidateRecordExists
    include Dry::Monads[:result]

    def call(params, param:, query:, search_by: :id)
      record = query.find_by(search_by => params[param])

      if record
        Success(record)
      else
        Failure(InteractionErrors.validation_error(details: { param => :not_found }))
      end
    end
  end
end