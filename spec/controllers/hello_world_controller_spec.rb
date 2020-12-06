require 'rails_helper'

RSpec.describe HelloWorldController, type: :request do
  describe 'GET /api/v1/hello_world' do
    let(:path) { '/api/v1/hello_world' }

    it 'authorizes user' do
      get path
      expect(response).to have_http_status(:unauthorized)
    end

    it 'renders json' do
      sign_in(create(:user))
      get path

      expect(response.status).to eq(200)
      expect(json_body.keys).to include('api_version', 'locale', 'details')
    end
  end
end
