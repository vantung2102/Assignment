# == Schema Information
#
# Table name: group_properties
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class GroupProperty < ApplicationRecord
  has_many :properties, dependent: :destroy
  
  validates :name, presence: true
  validates :description, presence: true
end
