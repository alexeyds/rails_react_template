Rails.application.routes.draw do
  scope 'api' do
    scope ":version", version: /v\d+/ do
      resources :hello_world, only: [:index]
    end
  end

  root to: 'react_spa#index'
  get "*path", to: "react_spa#index"
end
