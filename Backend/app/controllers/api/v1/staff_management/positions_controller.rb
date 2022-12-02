class Api::V1::StaffManagement::PositionsController < Api::V1::BaseController
  def index
    authorize Position
    pagy, positions = paginate(Position.order(created_at: :desc))
    render_resource_collection(positions, pagy: pagy)
  end

  def show
    authorize Position
    render_resource(position)
  end

  def create
    authorize Position
    position = Position.new(position_params)
    position.save ? render_resource(position, status: :created) : render_resource_errors(position.errors)
  end

  def update
    authorize Position
    position.update(position_params) ? render_resource(position) : render_resource_errors(position.errors)
  end

  def destroy
    authorize Position
    position.destroy!
    head :no_content
  end

  private

  def position
    @position ||= Position.find(params[:id])
  end

  def position_params
    params.require(:position).permit(:name, :description, :department_id)
  end
end
