require 'rails_helper'

RSpec.describe Sessions::PasswordLogin do
  let(:login) { described_class.new }

  describe '#call' do
    let(:user) { create(:user) }
    let(:params) { { email: user.email, password: user.password } }

    it 'returns user on successfull authentication' do
      result = login.call(params)
      first_session = Session.first

      expect(result.success).to eq(first_session)
      expect(first_session.expires_at).to be_present
      expect(first_session.user).to eq(user)
    end

    it 'validates email presence' do
      user.update!(email: '')
      result = login.call(params)

      expect(result.failure).to be_present
    end

    it 'validates password presence' do
      result = login.call(params.merge(password: ''))

      expect(result.failure).to be_present
    end

    it 'validates user existence' do
      create(:user)
      result = login.call({ email: 'foo@bar.com', password: '123' })

      expect(result.failure).to be_present
    end

    it 'validates user password' do
      user = create(:user, password: '321')
      result = login.call({ email: user.email, password: '123' })

      expect(result.failure).to be_present
    end
  end
end
