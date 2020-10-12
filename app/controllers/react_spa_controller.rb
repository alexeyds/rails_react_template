class ReactSpaController < ActionController::Base
  def index
    render file: 'public/react_spa/index.html'
  end
end