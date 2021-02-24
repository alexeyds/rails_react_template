module Validations
  module CustomTypes
    module Types
      include Dry.Types()
    end

    Email = Types::String.constructor { |s| s.strip.downcase }
  end
end
