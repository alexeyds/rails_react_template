require 'rails_helper'

RSpec.describe Sessions::SessionManager do
  let(:cookies_session) { {} }
  let(:session_manager) { described_class.new(cookies_session: cookies_session) }
  let(:user) { create(:user) }
  let(:session) { create(:session) }
  let(:first_session) { Session.first }

  describe '#current_session' do
    it 'returns session' do
      session_manager.current_session = session
      result = session_manager.current_session

      expect(result).to eq(session)
    end

    it 'returns nil if there is no session' do
      expect(session_manager.current_session).to eq(nil)
    end

    it 'returns nil if session is expired' do
      session_manager.current_session = create(:session, :expired)
      expect(session_manager.current_session).to eq(nil)
    end

    it 'returns nil if session expiration date is nil' do
      session_manager.current_session = create(:session, expires_at: nil)
      expect(session_manager.current_session).to eq(nil)
    end
  end

  describe '#current_session=' do
    it 'sets session' do
      session_manager.current_session = session

      expect(session_manager.current_session).to eq(session)
      expect(cookies_session).not_to be_empty
    end

    it 'expires previous session' do
      session_manager.current_session = session
      new_session = create(:session)
      session_manager.current_session = new_session

      expect(session.reload.expires_at).to eq(nil)
      expect(session_manager.current_session).to eq(new_session)
    end
  end

  describe '#expire_current_session' do
    it 'does nothing if there is no session' do
      session_manager.expire_current_session
    end

    it 'expires previous session' do
      session_manager.current_session = session
      session_manager.expire_current_session

      expect(session.reload.expires_at).to eq(nil)
      expect(session_manager.current_session).to eq(nil)
    end
  end
end
