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
class PropertySerializer < BaseSerializer
  attributes  :id,
              :code_seri,
              :name,
              :brand,
              :group_property,
              :price,
              :date_buy,
              :number_of_repairs,
              :status,
              :created_at,
              :updated_at
end
