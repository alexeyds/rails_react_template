module InteractionErrors
  Types = ConstantsDictionary.from_array([
    :flow_error,
    :validation_error,
    :authentication_error,
    :authorization_error,
    :not_found_error
  ])

  module_function

  def http_status(error)
    {
      Types.authentication_error => 401,
      Types.authorization_error => 403,
      Types.not_found_error => 404
    }.fetch(error[:type], 422)
  end

  def validation_error(message: error_message(:validation_error), details:)
    interaction_error(message: message, details: details, type: Types.validation_error)
  end

  def flow_error(message:, details: {})
    interaction_error(message: message, details: details, type: Types.flow_error)
  end

  [Types.authentication_error, Types.not_found_error, Types.authorization_error].each do |error_type|
    define_method(error_type) do |message: error_message(error_type)|
      interaction_error(message: message, details: {}, type: error_type)
    end
  end

  def interaction_error(message:, details:, type:)
    { message: message, details: details, type: type }
  end

  def error_message(slug)
    I18n.t(slug, scope: 'interaction_errors.error_messages')
  end
end
