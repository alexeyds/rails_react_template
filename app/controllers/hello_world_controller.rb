class HelloWorldController < ApplicationController
  def index
    sleep 1.second
    render json: { api_version: params[:version], locale: 'en', details: 'Hello world' }
  end
end
