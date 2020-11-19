module Validations
  [ValidatePresence, ValidateRecordExists, ValidateXorPresence].each do |validation_class|
    method_name = validation_class.name.demodulize.underscore

    define_method(method_name) do |*args, **rest|
      validation_class.new.call(*args, **rest)
    end
  end
end