require 'rails_helper'

RSpec.describe ErrorsController, type: :request do
  describe '#not_found' do
    it 'is rendered at any not found api page' do
      get '/api/foobar'

      expect(response).to have_http_status(404)
      expect(json_body['error']).to be_a(Hash)
    end
  end
end
