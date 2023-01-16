class Api::Auth::AuthenticationController < Api::V1::BaseController
  skip_before_action :authenticate_user, only: %i[log_in]

  def log_in
    @staff = Staff.find_by(email: params[:email])

    if @staff&.authenticate(params[:password])
      payload = { staff_id: @staff.id }
      token = jwt_encode(payload)
      render json: { token: token, staff: @staff.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def get_current_user
    render_resource(current_user)
  end
end
