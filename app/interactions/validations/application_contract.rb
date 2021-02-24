module Validations
  class ApplicationContract < Dry::Validation::Contract
    include Dry::Monads[:result]

    config.messages.backend = :i18n

    def self.use_schemas(*schemas, &block)
      params(*schemas.map(&:params), &block)

      schemas.each do |schema|
        self.class_eval(&schema.rules)
      end
    end

    def validate_params(params)
      params = params.to_unsafe_hash if params.is_a?(ActionController::Parameters)
      result = self.(params)

      if result.success?
        Success(result.to_h)
      else
        error = InteractionErrors.validation_error(details: result.errors.to_h)
        Failure(error)
      end
    end

    private

    def validate_record_exists(evaluator, query, field_name=:id)
      evaluator.key.failure(:record_exists?) unless query.where(field_name => evaluator.value).any?
    end
  end
end
