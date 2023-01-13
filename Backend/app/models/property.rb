# == Schema Information
#
# Table name: properties
#
#  id                :bigint           not null, primary key
#  code_seri         :string
#  name              :string
#  brand             :string
#  group_property_id :bigint
#  price             :float
#  date_buy          :datetime
#  number_of_repairs :integer
#  status            :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Property < ApplicationRecord
  enum status: {  available: 0, used: 1 }, _suffix: true

  belongs_to :group_property

  validates :code_seri, presence: true
  validates :status, presence: true
  validates :name, presence: true
  validates :brand, presence: true
  validates :group_property_id, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :date_buy, presence: true
  validates :number_of_repairs, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
