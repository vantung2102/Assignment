class Api::V1::LeaveManagement::LeavesController < Api::V1::BaseController
  def index
    pagy, leaves = current_user.has_role?(:Manager) ? paginate(Leave.order(created_at: :desc)) : paginate(Leave.find_by(staff_id: current_user.id))
    render_resource_collection(leaves, pagy: pagy)
  end

  def show
    authorize leave
    render_resource(leave)
  end

  def create
    authorize Leave
    leave = Leave.new(leave_params)
    leave.save ? render_resource(leave, status: :created) : render_resource_errors(leave.errors)
  end

  def update
    authorize Leave
    leave.update(leave_params) ? render_resource(leave) : render_resource_errors(leave.errors)
  end

  def destroy
    authorize Leave
    leave.destroy!
    head :no_content
  end

  def leave_by_user
    leave = Leave.find_by(staff_id: params[:staff_id])
    authorize leave
    render_resource(leave)
  end

  private

  def leave
    @leave ||= Leave.find(params[:id])
  end

  def leave_params
    params.require(:leave).permit(
      :staff_id,
      :casual_leave,
      :unpaid_leave,
      :marriage_leave,
      :compassionate_leave,
      :paternity_leave,
      :maternity_leave,
      :allowed_number_of_days_off,
      :description
    )
  end
end
