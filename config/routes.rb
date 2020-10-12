Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/", to: "react_spa#index"
  get "*path", to: "react_spa#index"
end
