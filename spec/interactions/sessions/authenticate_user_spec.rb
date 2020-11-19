require 'rails_helper'

RSpec.describe Sessions::AuthenticateUser do
  let(:authenticate) { described_class.new }
  let(:cookies_session) { {} }

  describe '#call' do
    let(:user) { create(:user) }
    let(:params) { { email: user.email, password: user.password } }

    it 'returns user on successfull authentication' do
      result = authenticate.call(params)

      expect(result.success).to eq(user)
    end

    it 'validates email presence' do
      user.update!(email: nil)
      result = authenticate.call(params)

      expect(result.failure).to be_present
    end

    it 'validates user existence' do
      create(:user)
      result = authenticate.call({ email: 'foo@bar.com', password: '123' })

      expect(result.failure).to be_present
    end

    it 'validates user password' do
      user = create(:user, password: '321')
      result = authenticate.call({ email: user.email, password: '123' })

      expect(result.failure).to be_present
    end
  end
end
