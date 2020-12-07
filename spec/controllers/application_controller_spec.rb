require 'rails_helper'

RSpec.describe ApplicationController, type: :request do
  let(:path) { '/api/v1/hello_world' }

  describe '#authenticate_user' do
    it 'renders 401 if user is not signed in' do
      get path

      expect(response).to have_http_status(401)
    end
  end
end
