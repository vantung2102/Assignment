class Api::V1::PropertyManagement::PropertyProvidingHistoriesController < Api::V1::BaseController
  def index
    authorize PropertyProvidingHistory
    pagy, property_providing_histories = paginate(PropertyProvidingHistory.order(created_at: :desc))
    render_resource_collection(property_providing_histories, pagy: pagy)
  end

  def show
    authorize PropertyProvidingHistory
    render_resource(property_providing_history)
  end

  def destroy
    authorize PropertyProvidingHistory
    property_providing_history_params.destroy!
    head :no_content
  end

  def histories_by_property
    authorize PropertyProvidingHistory
    property_providing_histories = PropertyProvidingHistory.where(
      property_id: property_providing_history_params[:property_id]).order(created_at: :desc
    )
    render_resource_collection(property_providing_histories)
  end

  private

  def property_providing_history
    @property_providing_history ||= PropertyProvidingHistory.find(params[:id])
  end

  def property_providing_history_params
    params.require(:property_providing_history).permit(:receiver_id, :property_id)
  end
end
