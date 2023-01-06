# == Schema Information
#
# Table name: onboarding_sample_steps
#
#  id          :bigint           not null, primary key
#  task        :string
#  position_id :bigint
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class OnboardingSampleStep < ApplicationRecord
  extend Filterable

  has_many :onboarding_steps
  belongs_to :position

  validates :task, presence: true
  validates :description, presence: true, length: { minimum: 5 }

  scope :filter_by_position, -> (position_id) { where position_id: position_id }
end
