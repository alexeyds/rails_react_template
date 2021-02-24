module Validations
  class ApplicationSchema
    def self.define_params(&block)
      @params = Dry::Schema.Params(&block)
    end

    def self.params
      @params
    end

    def self.define_rules(&block)
      @rules = block
    end

    def self.rules
      @rules || Proc.new { }
    end
  end
end
