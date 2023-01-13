class Api::V1::StaffManagement::DepartmentsController < Api::V1::BaseController
  def index
    authorize Department
    pagy, departments = paginate(Department.order(created_at: :desc))
    render_resource_collection(departments, pagy: pagy)
  end

  def get_all_department
    render_resource_collection(Department.all)
  end

  def show
    authorize Department
    render_resource(department)
  end

  def create
    authorize Department
    department = Department.new(department_params)
    department.save ? render_resource(department, status: :created) : render_resource_errors(department.errors)
  end

  def update
    authorize Department
    department.update(department_params) ? render_resource(department) : render_resource_errors(department.errors)
  end

  def destroy
    authorize Department
    department.destroy!
    head :no_content
  end

  private

  def department
    @department ||= Department.find(params[:id])
  end

  def department_params
    params.require(:department).permit(:name, :description)
  end
end
