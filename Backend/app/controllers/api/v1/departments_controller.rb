class Api::V1::DepartmentsController < Api::V1::BaseController
  before_action :set_department, only: %i[show update destroy]

  def index
    pagy, departments = paginate(Department.order(created_at: :desc))
    render_resource_collection(departments, pagy: pagy)
  end

  def show
    render_resource(@department)
  end

  def create
    department = Department.new(department_params)
    staff.save ? render_resource(department, status: :created) : render_resource_errors(department.errors)
  end

  def update
    @department.update(department_params) ? render_resource(@department) : render_resource_errors(@department.errors)
  end

  def destroy
    @department.destroy!
    head :no_content
  end

  private

  def set_department
    @department = Department.find(params[:id])
  end

  def department_params
    params.require(:department).permit(:name, :description)
  end
end
