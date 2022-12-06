# == Schema Information
#
# Table name: leaves
#
#  id                         :bigint           not null, primary key
#  staff_id                   :bigint
#  casual_leave               :float
#  marriage_leave             :float
#  compassionate_leave        :float
#  paternity_leave            :float
#  maternity_leave            :float
#  unpaid_leave               :float
#  allowed_number_of_days_off :float
#  description                :string
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#
class Leave < ApplicationRecord
  belongs_to :staff

  validates :casual_leave, numericality: { greater_than_or_equal_to: 0 }
  validates :unpaid_leave, numericality: { greater_than_or_equal_to: 0 }
  validates :marriage_leave, numericality: { greater_than_or_equal_to: 0 }
  validates :compassionate_leave, numericality: { greater_than_or_equal_to: 0 }
  validates :paternity_leave, numericality: { greater_than_or_equal_to: 0 }
  validates :maternity_leave, numericality: { greater_than_or_equal_to: 0 }
  validates :allowed_number_of_days_off, numericality: { greater_than_or_equal_to: 0 }
  validates :description, length: { minimum: 6, maximum: 5000 }
end
