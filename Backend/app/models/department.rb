# == Schema Information
#
# Table name: departments
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Department < ApplicationRecord
  has_one :staff
  has_many :positions, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 5 }
end
