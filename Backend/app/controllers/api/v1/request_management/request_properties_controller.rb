class Api::V1::RequestManagement::RequestPropertiesController < Api::V1::BaseController
  def index
    pagy, request_properties = current_user.has_role?(:Manager) ? paginate(RequestProperty.order(created_at: :desc)) : paginate(RequestProperty.find_by(requester_id: current_user.id))
    render_resource_collection(request_properties, pagy: pagy)
  end

  def show
    authorize request_property
    render_resource(request_property)
  end

  def create
    request_property = RequestProperty.new(request_property_params)
    request_property.requester_id = current_user.id
    request_property.save ? render_resource(request_property, status: :created) : render_resource_errors(request_property.errors)
  end

  def update
    authorize request_property
    request_property.update(request_property_params) ? render_resource(request_property) : render_resource_errors(request_property.errors)
  end

  def destroy
    authorize request_property
    request_property.destroy!
    head :no_content
  end

  def response_request
    authorize RequestProperty
    status = params[:response_type] == "cancelled" ? :cancelled : :approved
    request_property.update(status: status, approver_id: current_user.id) ? render_resource(request_property) : render_resource_errors(request_property.errors)
  end

  def requests_by_user
    pagy, request_properties = paginate(RequestProperty.find_by(requester_id: params[:staff_id]).order(created_at: :desc))
    render_resource_collection(request_properties, pagy: pagy)
  end

  private

  def request_property
    @request_property ||= RequestProperty.find(params[:id])
  end

  def request_property_params
    params.require(:request_property).permit(:request_type, :status, :description, :reason)
  end
end
