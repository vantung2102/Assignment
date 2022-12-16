class Api::V1::PropertyManagement::PropertyProvidingHistoriesController < Api::V1::BaseController
  def index
    authorize PropertyProvidingHistory
    pagy, property_providing_histories = paginate(PropertyProvidingHistory.order(created_at: :desc))
    render_resource_collection(property_providing_histories, pagy: pagy)
  end

  def create
    authorize PropertyProvidingHistory
    create, property_providing_history = Properties::PropertyProvidingHistoriesService.call(property_providing_history_params)
    create ? render_resource(property_providing_history) : render_resource_errors(property_providing_history)
  end

  def destroy
    authorize PropertyProvidingHistory
    property_providing_history_params.destroy!
    head :no_content
  end

  private

  def property_providing_history
    @property_providing_history ||= PropertyProvidingHistory.find(params[:id])
  end

  def property_providing_history_params
    params.require(:property_providing_history).permit(:provider_id, :receiver_id, :property_id, :status)
  end
end
