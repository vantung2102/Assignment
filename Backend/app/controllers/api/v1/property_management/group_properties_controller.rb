class Api::V1::PropertyManagement::GroupPropertiesController < Api::V1::BaseController
  def index
    authorize GroupProperty
    pagy, group_properties = paginate(GroupProperty.order(created_at: :desc))
    render_resource_collection(group_properties, pagy: pagy)
  end

  def show
    authorize GroupProperty
    render_resource(group_property)
  end

  def create
    authorize GroupProperty
    group_property = GroupProperty.new(group_property_params)
    group_property.save ? render_resource(group_property, status: :created) : render_resource_errors(group_property.errors)
  end

  def update
    authorize GroupProperty
    group_property.update(group_property_params) ? render_resource(group_property) : render_resource_errors(group_property.errors)
  end

  def destroy
    authorize GroupProperty
    group_property.destroy!
    head :no_content
  end

  private

  def group_property
    @group_property ||= GroupProperty.find(params[:id])
  end

  def group_property_params
    params.require(:group_property).permit(:name, :description)
  end
end

