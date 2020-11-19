require 'rails_helper'

RSpec.describe Validations::ValidateRecordExists do
  include Validations

  describe '#call' do
    it 'returns found record' do
      user = create(:user)
      result = validate_record_exists({ user_id: user.id }, param: :user_id, query: User)

      expect(result.success).to eq(user)
    end

    it 'returns failure if record not found' do
      result = validate_record_exists({ user_id: 1 }, param: :user_id, query: User)

      failure = result.failure
      expect(failure).not_to eq(nil)
      expect(failure[:details][:user_id]).to be_present
    end

    it 'allows searching by other fields than id' do
      user = create(:user, email: 'foo@bar.com')
      result = validate_record_exists({ email: user.email }, param: :email, query: User, search_by: :email)

      expect(result.success).to eq(user)
    end
  end
end
