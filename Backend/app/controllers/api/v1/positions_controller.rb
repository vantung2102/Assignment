class Api::V1::PositionsController < Api::V1::BaseController
  before_action :set_position, only: %i[show update destroy]

  def index
    pagy, positions = paginate(Position.order(created_at: :desc))
    render_resource_collection(positions, pagy: pagy)
  end

  def show
    render_resource(@position)
  end

  def create
    position = Position.new(position_params)
    position.save ? render_resource(position, status: :created) : render_resource_errors(position.errors)
  end

  def update
    @position.update(position_params) ? render_resource(@position) : render_resource_errors(@position.errors)
  end

  def destroy
    @position.destroy!
    head :no_content
  end

  private

  def set_position
    @position = Position.find(params[:id])
  end

  def position_params
    params.require(:position).permit(:name, :description, :department_id)
  end
end
