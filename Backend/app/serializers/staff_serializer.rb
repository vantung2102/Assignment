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
class StaffSerializer < BaseSerializer
  attributes  :id,
              :fullname,
              :email,
              :contract_name,
              :date_of_birth,
              :start_contract,
              :gender,
              :contract_term,
              :status,
              :position,
              :department,
              :staff_id
end
