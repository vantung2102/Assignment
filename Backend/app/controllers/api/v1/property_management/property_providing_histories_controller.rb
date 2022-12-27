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

  def create
    authorize PropertyProvidingHistory
    create, property_providing_history = Properties::PropertyProvidingHistoriesService.call(current_user, property_providing_history_params)
    create ? render_resource(property_providing_history) : render_resource_errors(property_providing_history)
  end

  def property_recall
    authorize PropertyProvidingHistory
    property = Property.find(property_providing_history.property_id)
    begin
      property_providing_history.update!(status: :recall)
      property.update!(status: :available)
      render_resource(property_providing_history)
    rescue
      render_resource_errors(status: "error", detail: I18n.t('error_codes.E206'))
    end
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
    params.require(:property_providing_history).permit(:receiver_id, :property_id)
  end
end
