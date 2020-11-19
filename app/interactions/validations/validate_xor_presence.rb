module Validations
  class ValidateXorPresence
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
      errors = {}

      fields.each do |key|
        if params[key].present?
          errors = {}
          break
        elsif errors.empty?
          errors[key] = :missing
        end
      end

      errors
    end
  end
end