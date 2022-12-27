class Api::Auth::AuthenticationController < Api::V1::BaseController
  skip_before_action :authenticate_user, only: %i[log_in]
  REMEMBER_ME = { on: 1, off: 0 }.freeze

  def log_in
    @staff = Staff.find_by_email(params[:email])
    if @staff&.authenticate(params[:password])
      payload = { staff_id: @staff.id }
      token = jwt_encode(payload)
      time = Time.now + 24.hours.to_i
      render json: { token: token, staff: @staff.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def get_current_user
    render json: { user: current_user }, status: :ok
  end
end
