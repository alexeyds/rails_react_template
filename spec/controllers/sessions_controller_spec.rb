require 'rails_helper'

RSpec.describe SessionsController, type: :request do
  let(:current_session_path) { '/api/v1/sessions/current' }

  describe 'GET /api/v1/sessions/current' do
    let(:path) { current_session_path }

    it 'renders current_session: nil if user is not logged in' do
      get path

      expect(response.status).to eq(200)
      expect(json_body.key?('current_session')).to eq(true)
      expect(json_body['current_session']).to eq(nil)
    end
  end

  describe 'POST /api/v1/sessions' do
    let(:path) { '/api/v1/sessions' }
    let(:user) { create(:user) }

    it 'returns session info' do
      post path, params: { password: user.password, email: user.email }

      expect(response.status).to eq(200)
      expect(json_body['current_session']).to be_present
      expect(json_body['current_session'].keys).to include('expires_at', 'user')
    end

    it 'renders errors' do
      post path, params: { password: 'wrongpass', email: user.email }

      expect(response.status).to eq(422)
      expect(json_body['error']).to be_present
    end

    it 'actually signs user in' do
      post path, params: { password: user.password, email: user.email }
      get current_session_path

      expect(json_body['current_session']).to be_present
    end
  end

  describe 'DESTROY /api/v1/sessions' do
    let(:path) { '/api/v1/sessions' }
    let(:user) { create(:user) }

    it 'signs user out' do
      post path, params: { password: user.password, email: user.email }
      delete path
      get current_session_path

      expect(json_body['current_session']).to eq(nil)
    end
  end
end
