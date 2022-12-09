# == Schema Information
#
# Table name: positions
#
#  id            :bigint           not null, primary key
#  name          :string
#  department_id :bigint
#  description   :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Position < ApplicationRecord
  has_one :staff
  has_many :staff_onboardings
  has_many :onboarding_sample_steps
  has_many :probations, :foreign_key => 'position_id'

  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 5 }
  validates :department_id, presence: true
end
