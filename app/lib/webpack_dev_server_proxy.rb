class WebpackDevServerProxy < Rack::Proxy
  def perform_request(env)
    route_params = recognize_route(Rack::Request.new(env))

    if (react_spa_route?(route_params))
      super(env)
    else
      @app.call(env)
    end
  end

  private

  def recognize_route(request)
    Rails.application.routes.router.recognize(request) do |route, params|
      return params
    end

    return nil
  end

  def react_spa_route?(route_params)
    route_params && route_params[:controller] == 'react_spa'
  end
end