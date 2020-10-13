require 'rails_helper'

RSpec.describe HelloWorldController, type: :request do
  describe 'GET /api/v1/hello_world' do
    let(:path) { '/api/v1/hello_world' }

    it 'renders json' do
      get path

      expect(response.status).to eq(200)
      expect(json_body.keys).to include('api_version', 'locale', 'details')
    end
  end
end
