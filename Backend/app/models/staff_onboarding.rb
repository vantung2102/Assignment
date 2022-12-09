# == Schema Information
#
# Table name: staff_onboardings
#
#  id          :bigint           not null, primary key
#  staff_id    :bigint
#  active      :boolean
#  position_id :integer
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class StaffOnboarding < ApplicationRecord
  belongs_to :staff
  belongs_to :position
end
