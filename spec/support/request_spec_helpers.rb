module RequestSpecHelpers
  def json_body
    JSON.parse(response.body)
  end

  def sign_in(user)
    post '/api/v1/sessions/__testonly_sign_in', params: { user_id: user.id }
  end
end
