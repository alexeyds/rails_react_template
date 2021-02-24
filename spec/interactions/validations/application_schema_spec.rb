require 'rails_helper'

RSpec.describe Validations::ApplicationSchema do
  let(:schema) { Class.new(Validations::ApplicationSchema) }

  describe '::define_params' do
    it 'defines params' do
      schema.define_params do
        required(:name).filled(:string)
      end

      result = schema.params.call(foo: 'bar', name: 'john')
      expect(result.to_h).to eq(name: 'john')
    end
  end

  describe '::rules' do
    it 'returns empty block by default' do
      expect(schema.rules).to be_a(Proc)
    end
  end

  describe '::define_rules' do
    it 'sets ::rules' do
      block = Proc.new { }
      schema.define_rules(&block)
      expect(schema.rules).to eq(block)
    end
  end
end
