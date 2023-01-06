class Api::V1::StaffManagement::StaffsController < Api::V1::BaseController
  def index
    pagy, staffs = paginate(Staff.filter(params.slice(:status, :fullname, :position, :department, :job_title)))
    render_resource_collection(staffs.order(created_at: :desc), pagy: pagy)
  end

  def show
    authorize staff
    render_resource(staff)
  end

  def create
    authorize Staff
    begin
      ActiveRecord::Base.transaction do
        staff = Staff.create!(staff_params)
        render_resource(staff, status: :created)
      end
    rescue StandardError => e
      render_resource_errors(detail: e)
    end
  end

  def update
    authorize staff
    update = staff.update(staff_params) ? render_resource(staff) : render_resource_errors(staff.errors)
  end

  def update_staff_activation_status
    update, staff = Staffs::UpdateStaffActivationStatusService.call(staff, params[:status])
    update ? render_resource(staff) : render_resource_errors(detail: staff)
  end

  def destroy
    authorize Staff
    staff_lower_levels = staff.staff_lower_levels

    if staff_lower_levels.present?
      render_resource_collection(staff_lower_levels)
    else
      staff.destroy!
      head :no_content
    end
  end

  def destroy_and_update_staff_boss
    authorize Staff

    begin
      ActiveRecord::Base.transaction do
        Staff.where(id: params[:staffs]['id']).update(staff_id: params[:staffs]['boss_id'])
        staff.destroy!
      end
      head :ok
    rescue StandardError => e
      render json: { status: 'error', detail: e }
    end
  end
                                                                        
  def staff_chart
    # chart = Staffs::StaffChartService.call
    # render json: chart
    staffs = Staff.all
    render_resource_collection(staffs)
  end

  def staff_chart_by_node
    staffs = staff.lower_levels
    render_resource_collection(staffs)
  end

  private

  def staff
    @staff ||= Staff.find(params[:id])
  end

  def staff_params
    params.require(:staff).permit(
      :fullname,
      :date_of_birth,
      :gender,
      :email,
      :password,
      :position_id,
      :department_id,
      :job_title_id,
      :status,
      :staff_id
    )
  end
end
