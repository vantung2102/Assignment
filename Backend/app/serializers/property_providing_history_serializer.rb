# == Schema Information
#
# Table name: property_providing_histories
#
#  id          :bigint           not null, primary key
#  provider_id :integer
#  receiver_id :integer
#  property_id :bigint
#  status      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class PropertyProvidingHistorySerializer < BaseSerializer
  attributes  :id,
              :provider_id,
              :receiver_id,
              :property,
              :status,
              :created_at,
              :updated_at
end
