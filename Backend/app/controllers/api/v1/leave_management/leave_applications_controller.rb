class Api::V1::LeaveManagement::LeaveApplicationsController < Api::V1::BaseController
  def index
    authorize LeaveApplication
    leave_applications = LeaveApplication.where(status: :pending).order(created_at: :desc)
    render_resource_collection(leave_applications.includes(:staff, :approver))
  end

  def show
    authorize leave_application
    render_resource(leave_application)
  end

  def create
    create, leave_application = Leaves::CreateLeaveApplicationService.call(current_user, leave_application_params)
    if create
      render_resource(leave_application,
                      status: :created)
    else
      render_resource_errors(detail: leave_application)
    end
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
    leave_applications = LeaveApplication.where(staff_id: params[:staff_id]).order(created_at: :desc)
    authorize leave_applications
    render_resource_collection(leave_applications)
  end

  def leave_application_by_status
    authorize LeaveApplication
    leave_application = LeaveApplication.where(status: params[:status]).order(created_at: :desc)
    render_resource_collection(leave_application.includes(:staff, :approver))
  end

  def respond_to_leave_application
    authorize LeaveApplication
    leave_application
    reponse, leave_application = Leaves::RespondToLeaveApplicationService.call(current_user, @leave_application,
                                                                                leave_application_params[:status])
    reponse ? render_resource(leave_application) : render_resource_errors(detail: leave_application)
  end

  private

  def leave_application
    @leave_application ||= LeaveApplication.find(params[:id])
  end

  def leave_application_params
    params.require(:leave_application).permit(
      :leave_type,
      :number_of_days_off,
      :start_day,
      :status,
      :end_day,
      :description
    )
  end
end
