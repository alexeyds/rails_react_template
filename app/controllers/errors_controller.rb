class ErrorsController < ApplicationController
  def not_found
    render_interaction_error(InteractionErrors.not_found_error)
  end
end
