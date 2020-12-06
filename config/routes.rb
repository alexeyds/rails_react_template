Rails.application.routes.draw do
  scope 'api' do
    scope ":version", version: /v\d+/ do
      resources :hello_world, only: [:index]
      resource :sessions, only: [:create, :destroy] do
        get :current
        post :__testonly_sign_in if Rails.env.test?
      end
    end

    get "*path", to: 'errors#not_found'
  end

  root to: 'react_spa#index'
  get "*path", to: "react_spa#index"
end
