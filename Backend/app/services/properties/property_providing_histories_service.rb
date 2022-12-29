class Properties::PropertyProvidingHistoriesService < ApplicationService
  def initialize(user, params)
    @user = user
    @params = params
  end

  def call
    property_providing_history = PropertyProvidingHistory.new(params)
    begin
      ActiveRecord::Base.transaction do
        property = Property.find(params[:property_id])
        [false] if property.used_status?

        property_providing_history.provider_id = user.id
        property_providing_history.status = :provided
        property_providing_history.save!
        property.update!(status: :used)
        [true, property_providing_history]
      end
    rescue StandardError => e
      [false, e]
    end
  end

  private

  attr_accessor :user, :params
end
