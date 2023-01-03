# == Schema Information
#
# Table name: leave_applications
#
#  id                 :bigint           not null, primary key
#  leave_type         :integer
#  number_of_days_off :float
#  start_day          :date
#  end_day            :date
#  status             :integer
#  staff_id           :integer
#  approver_id        :integer
#  description        :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class LeaveApplicationSerializer < BaseSerializer
  attributes  :id,
              :leave_type,
              :start_day,
              :end_day,
              :number_of_days_off,
              :status,
              :staff,
              :approver,
              :description,
              :created_at,
              :updated_at
end
