# == Schema Information
#
# Table name: staff_contracts
#
#  id          :bigint           not null, primary key
#  title       :string
#  staff_id    :bigint
#  start_date  :date
#  end_date    :date
#  status      :integer
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class StaffContract < ApplicationRecord
  enum status: { effective: 0, expiry: 1, pause: 3 }
  belongs_to :staff

  validates :title, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :status, presence: true
  validates :description, presence: true
end
