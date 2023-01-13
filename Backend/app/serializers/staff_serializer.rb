# == Schema Information
#
# Table name: staffs
#
#  id              :bigint           not null, primary key
#  fullname        :string
#  date_of_birth   :date
#  gender          :string
#  status          :integer
#  position_id     :bigint
#  department_id   :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  staff_id        :bigint
#  email           :string
#  password_digest :string
#  deleted_at      :datetime
#  job_title_id    :bigint
#  phone           :string
#  address         :text
#
class StaffSerializer < BaseSerializer
  attributes  :id,
              :fullname,
              :email,
              :phone,
              :address,
              :join_date,
              :date_of_birth,
              :gender,
              :status,
              :position,
              :department,
              :job_title,
              :upper_level,
              :lower_levels,
              :roles
end
