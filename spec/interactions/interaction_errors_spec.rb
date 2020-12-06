require 'rails_helper'

RSpec.describe InteractionErrors do
  types = InteractionErrors::Types

  describe '::flow_error' do
    it 'composes error hash' do
      result = InteractionErrors.flow_error(message: 'hello')

      expect(result[:message]).to eq('hello')
      expect(result[:details]).to eq({})
      expect(result[:type]).to eq(types.flow_error)
    end

    it 'accepts optional :details keyword' do
      result = InteractionErrors.flow_error(message: 'hello', details: {foo: :bar})

      expect(result[:details]).to eq({foo: :bar})
    end
  end

  describe '::validation_error' do
    it 'translates details' do
      result = InteractionErrors.validation_error(details: {foo: :missing})

      expect(result[:details][:foo]).to be_present
      expect(result[:message]).to be_present
      expect(result[:type]).to eq(types.validation_error)
    end

    it 'accepts optional :message keyword' do
      result = InteractionErrors.validation_error(message: 'hello', details: {foo: :missing})

      expect(result[:message]).to eq('hello')
    end
  end

  [types.authentication_error, types.authorization_error, types.not_found_error].each do |error_type|
    describe "::#{error_type}" do
      it 'composes error hash' do
        result = InteractionErrors.send(error_type)

        expect(result[:message]).to be_present
        expect(result[:details]).to eq({})
        expect(result[:type]).to eq(error_type)
      end
    end
  end
end
