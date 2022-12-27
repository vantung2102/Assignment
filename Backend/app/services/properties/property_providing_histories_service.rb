class Properties::PropertyProvidingHistoriesService < ApplicationService
  def initialize(params)
    @params = params
  end

  def call
    property_providing_history = PropertyProvidingHistory.new(params)
    begin
      ActiveRecord::Base.transaction do
        property_providing_history.save!
        property = Property.find(params[:property_id])
        status = params[:status].available_status? ? :used : :available
        property.update!(status: status)
        [true, property_providing_history]
      end
    rescue StandardError => e
      [false, e]
    end
  end

  private

  attr_accessor :params
end
