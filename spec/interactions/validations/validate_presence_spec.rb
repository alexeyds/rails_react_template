require 'rails_helper'

RSpec.describe Validations::ValidatePresence do
  include Validations

  describe '#call' do
    it 'returns success if all fields are present' do
      result = validate_presence({foo: 'bar', bar: 'baz'}, [:foo])

      expect(result.failure).to eq(nil)
      expect(result.success).to eq(true)
    end

    it 'returns failure if some fields are missing' do
      result = validate_presence({foo: 'bar'}, [:foo, :bar])

      failure = result.failure
      expect(failure).not_to eq(nil)
      expect(failure[:details][:bar]).to be_present
    end
  end
end
