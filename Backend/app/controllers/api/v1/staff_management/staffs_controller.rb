class Api::V1::StaffManagement::StaffsController < Api::V1::BaseController
  def index
    pagy, staffs = paginate(Staff.order(created_at: :desc))
    render_resource_collection(staffs, pagy: pagy)
  end

  def show
    authorize staff
    render_resource(staff)
  end

  def create
    authorize Staff
    staff = Staff.new(staff_params)
    staff.save ? render_resource(staff, status: :created) : render_resource_errors(staff.errors)
  end

  def update
    authorize staff
    staff.update(staff_params) ? render_resource(staff) : render_resource_errors(staff.errors)
  end

  def destroy
    authorize Staff
    staff.destroy!
    head :no_content
  end
                                                                        
  def staff_chart
    chart = Staffs::StaffChartService.call
    render json: chart
  end

  private

  def staff
    @staff ||= Staff.find(params[:id])
  end

  def staff_params
    params.require(:staff).permit(:fullname, :email, :password, :contract_name, :contract_term, :status, :position_id, :department_id)
  end
end
