class Api::Auth::AuthenticationController < Api::V1::BaseController
  include ActionController::Cookies

  skip_before_action :authenticate_user, only: %i[log_in]
  REMEMBER_ME = { on: 1, off: 0 }.freeze

  def log_in
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      payload = { user_id: @user.id }
      token = jwt_encode(payload)
      time = Time.now + 24.hours.to_i
      render json: { token: token, user: @user.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def log_out
    cookies.delete(:user_id)
    @current_user = nil
    head :no_content
  end
end
