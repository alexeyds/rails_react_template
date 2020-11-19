module Validations
  class ValidatePresence
    include Dry::Monads[:result]

    def call(params, fields)
      errors = collect_errors(params, fields)

      if errors.any?
        Failure(InteractionErrors.validation_error(details: errors))
      else
        Success(true)
      end
    end

    private

    def collect_errors(params, fields)
      fields.each_with_object({}) do |key, errors|
        errors[key] = :missing if params[key].blank?
      end
    end
  end
end