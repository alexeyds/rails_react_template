require 'rails_helper'

RSpec.describe Sessions::SessionManager do
  let(:cookies_session) { { session_id: '123' } }
  let(:session_manager) { described_class.new(cookies_session) }
  let(:user) { create(:user) }
  let(:first_session) { Session.first }

  describe '#current_session' do
    it 'returns session' do
      session_manager.create_session(user: user)
      result = session_manager.current_session

      expect(result).to be_present
      expect(result).to eq(Session.first)
    end

    it 'returns nil if there is no session' do
      expect(session_manager.current_session).to eq(nil)
    end

    it 'returns nil if session is expired' do
      session_manager.create_session(user: user)
      first_session.update!(expires_at: 2.hours.ago)

      expect(session_manager.current_session).to eq(nil)
    end

    it 'returns nil if session expireation date is nil' do
      session_manager.create_session(user: user)
      first_session.update!(expires_at: nil)

      expect(session_manager.current_session).to eq(nil)
    end
  end

  describe '#create_session' do
    it 'creates session' do
      result = session_manager.create_session(user: user)

      expect(Session.count).to eq(1)
      expect(result).to eq(first_session)
      expect(first_session.user_id).to eq(user.id)
      expect(first_session.expires_at).to be_future
    end

    it 'destroys previous session' do
      session_manager.create_session(user: user)
      previous_session = Session.first
      session_manager.create_session(user: user)

      expect(Session.count).to eq(1)
      expect { previous_session.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe '#destroy_session' do
    it 'does nothing if there is no session' do
      session_manager.destroy_session
    end

    it 'destroys previous session' do
      session_manager.create_session(user: user)
      session_manager.destroy_session

      expect(Session.count).to eq(0)
      expect(session_manager.current_session).to eq(nil)
    end
  end
end
