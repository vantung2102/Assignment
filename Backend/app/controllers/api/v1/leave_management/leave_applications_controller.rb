class Api::V1::LeaveManagement::LeaveApplicationsController < Api::V1::BaseController
  def index
    pagy, leave_applications = current_user.has_role?(:Manager) ? paginate(LeaveApplication.order(created_at: :desc)) : paginate(LeaveApplication.find_by(staff_id: current_user.id))
    render_resource_collection(leave_applications, pagy: pagy)
  end

  def show
    authorize leave_application
    render_resource(leave_application)
  end

  def create
    create, leave_application = Leaves::CreateLeaveApplicationService.call(current_user, leave_application_params)
    create ? render_resource(leave_application, status: :created) : render_resource_errors(title: leave_application, status: 500)
  end

  def update
    authorize LeaveApplication
    leave_application.update(leave_application_params) ? render_resource(leave_application) : render_resource_errors(leave_application.errors)
  end

  def destroy
    authorize leave_application
    leave_application.destroy!
    head :no_content
  end

  def leave_application_by_user
    if current_user.has_role?(:Manager) || params[:staff_id] == current_user.id.to_s
      pagy, leave_applications = paginate(LeaveApplication.where(staff_id: params[:staff_id]).order(created_at: :desc))
      render_resource_collection(leave_applications, pagy: pagy)
    else
      render_resource_errors(title: "you can't see this person's info", status: 500)
    end
  end

  def leave_application_by_status
    authorize LeaveApplication
    pagy, leave_application = paginate(LeaveApplication.where(status: params[:status]).order(created_at: :desc))
    render_resource_collection(leave_application, pagy: pagy)
  end

  def respond_to_leave_application
    authorize LeaveApplication
    leave_application
    reponse, leave_application = Leaves::RespondToLeaveApplicationService.call(current_user, @leave_application, leave_application_params[:status])
    reponse ? render_resource(leave_application) : render_resource_errors(title: leave_application, status: 500)
  end

  private

  def leave_application
    @leave_application ||= LeaveApplication.find(params[:id])
  end

  def leave_application_params
    params.require(:leave_application).permit(:leave_type, :number_of_days_off, :start_day, :end_day, :status, :description)
  end
end
