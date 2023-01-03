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
class LeaveSerializer < BaseSerializer
  attributes  :id,
              :staff,
              :casual_leave,
              :marriage_leave,
              :compassionate_leave,
              :paternity_leave,
              :maternity_leave,
              :unpaid_leave,
              :allowed_number_of_days_off,
              :description,
              :created_at,
              :updated_at
end
