module InteractionErrors
  Types = ConstantsDictionary.from_array([:flow_error, :validation_error])

  module_function

  def validation_error(message: error_message(:invalid_request_data), details:)
    details = details.map { |k, v| [k, validation_message(v)] }.to_h

    interaction_error(message: message, details: details, type: Types.validation_error)
  end

  def flow_error(message:, details: {})
    interaction_error(message: message, details: details, type: Types.flow_error)
  end

  def interaction_error(message:, details:, type:)
    { message: message, details: details, type: type }
  end

  def error_message(slug)
    I18n.t(slug, scope: 'interaction_errors.error_messages')
  end

  def validation_message(slug)
    I18n.t(slug, scope: 'interaction_errors.validation_messages')
  end
end
