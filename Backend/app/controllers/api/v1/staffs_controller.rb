class Api::V1::StaffsController < Api::V1::BaseController
  before_action :set_staff, only: %i[show update destroy]

  def index
    pagy, staffs = paginate(Staff.order(created_at: :desc))
    render_resource_collection(staffs, pagy: pagy)
  end

  def show
    render_resource(@staff)
  end

  def create
    staff = Staff.new(staff_params)
    staff.save ? render_resource(staff, status: :created) : render_resource_errors(staff.errors)
  end

  def update
    @staff.update(staff_params) ? render_resource(@staff) : render_resource_errors(@staff.errors)
  end

  def destroy
    @staff.destroy!
    head :no_content
  end
                                                                        
  def company_chart
    chart = Staff.chart
    render json: chart
  end

  private

  def set_staff
    @staff = Staff.find(params[:id])
  end

  def staff_params
    params.require(:staff).permit(:fullname, :contract_name, :contract_term, :status)
  end
end
