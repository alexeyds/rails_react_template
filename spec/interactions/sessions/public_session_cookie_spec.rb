require 'rails_helper'

RSpec.describe Sessions::PublicSessionCookie do
  let(:cookies) { {} }
  let(:public_cookie) { described_class }

  describe '::update' do
    it 'sets current_session cookie' do
      session = create(:session, user: create(:user))
      public_cookie.update(cookies, session: session)

      cookie = cookies[:current_session]
      expect(cookie[:value]).to be_present
      expect(cookie[:httponly]).to eq(false)
      expect(cookie[:expires]).to eq(session.expires_at)
    end

    it 'deletes current_session cookie if session is nil' do
      allow(cookies).to receive(:delete)
      public_cookie.update(cookies, session: nil)

      expect(cookies).to have_received(:delete).with(:current_session).once
    end
  end
end
