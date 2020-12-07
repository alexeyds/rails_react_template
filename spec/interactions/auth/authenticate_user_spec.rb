require 'rails_helper'

RSpec.describe Auth::AuthenticateUser do
  let (:authenticate) { described_class.new }

  describe '#call' do
    it 'returns failure if user is nil' do
      result = authenticate.call(nil)
      expect(result.failure).to be_present
    end

    it 'retunrs success if user is present' do
      result = authenticate.call(build(:user))
      expect(result.success?).to eq(true)
    end
  end
end
