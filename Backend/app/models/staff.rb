# == Schema Information
#
# Table name: staffs
#
#  id              :bigint           not null, primary key
#  fullname        :string
#  date_of_birth   :date
#  gender          :string
#  contract_name   :string
#  status          :integer
#  start_contract  :date
#  contract_term   :date
#  position_id     :bigint
#  department_id   :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  staff_id        :bigint
#  email           :string
#  password_digest :string
#
class Staff < ApplicationRecord
  rolify
  has_secure_password

  enum status: { effective: 0, expires: 1, pause: 2 }

  belongs_to :upper_level, class_name: 'Staff', optional: true, foreign_key: :staff_id
  has_many :lower_levels, class_name: 'Staff'

  has_many :provided, class_name: 'ProvideAsset', :foreign_key => 'provider_id'
  has_many :be_provided, class_name: 'ProvideAsset', :foreign_key => 'receiver_id'

  has_many :requested, class_name: 'RequestProperty', :foreign_key => 'requester_id'
  has_many :be_requested, class_name: 'RequestProperty', :foreign_key => 'approver_id'

  belongs_to :position
  belongs_to :department

  validates :fullname, presence: true
  validates :contract_name, presence: true
  validates :contract_term, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end
