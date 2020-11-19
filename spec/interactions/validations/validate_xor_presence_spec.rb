require 'rails_helper'

RSpec.describe Validations::ValidateXorPresence do
  include Validations

  describe '#call' do
    it 'returns success if all fields are present' do
      result = validate_xor_presence({foo: 'bar'}, [:foo])

      expect(result.failure).to eq(nil)
      expect(result.success).to eq(true)
    end

    it 'returns failure if all fields are missing' do
      result = validate_xor_presence({}, [:foo])

      failure = result.failure
      expect(failure).not_to eq(nil)
      expect(failure[:details][:foo]).to be_present
    end

    it 'returns sucess if only one of the listed fields is present' do
      result = validate_xor_presence({bar: 'bar'}, [:foo, :bar])

      expect(result.failure).to eq(nil)
    end

    it 'only includes first missing field in error details' do
      result = validate_xor_presence({}, [:foo, :bar])

      details = result.failure[:details]
      expect(details.key?(:foo)).to eq(true)
      expect(details.key?(:bar)).to eq(false)
    end
  end
end
