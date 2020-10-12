Rails.application.routes.draw do
  root to: 'react_spa#index'
  get "*path", to: "react_spa#index"
end
