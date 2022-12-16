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

class LeaveApplication < ApplicationRecord
  enum leave_type: { 
                      casual_leave: 0, # nghi theo luat cty
                      unpaid_leave: 1, # nghi khong luong
                      marriage_leave: 2, # 3 days
                      compassionate_leave: 3, # 3 days (gia dinh nguoi than mat),
                      paternity_leave:  4, # 1 day (vo hoac con sinh)
                      maternity_leave: 5, # 6 month ( truoc va sau khi sinh)
                    }, _suffix: true
  enum status: { pending: 0, approved: 1, cancelled: 2 }

  belongs_to :staff, class_name: 'Staff'
  belongs_to :approver, class_name: 'Staff', optional: true

  validates :leave_type, presence: true
  validates :start_day, presence: true
  validates :end_day, presence: true
  validates :staff_id, presence: true
  validates :description, presence: true, length: { minimum:6, maximum:5000 }
end
