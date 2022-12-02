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
class PropertyProvidingHistory < ApplicationRecord
  enum status: { provided: 0, recall: 1 }
  belongs_to :provider, class_name: 'Staff'
  belongs_to :receiver, class_name: 'Staff'
  belongs_to :property

  validates :provider_id, presence: true
  validates :receiver_id, presence: true
  validates :property_id, presence: true
end
