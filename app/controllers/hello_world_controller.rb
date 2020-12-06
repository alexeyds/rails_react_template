class HelloWorldController < ApplicationController
  before_action :authenticate_user

  def index
    render json: { api_version: params[:version], locale: 'en', details: 'Hello world', user_email: current_user.email }
  end
end
