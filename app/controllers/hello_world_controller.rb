class HelloWorldController < ApplicationController
  def index
    render json: { api_version: params[:version], locale: 'en', details: 'Hello world' }
  end
end
