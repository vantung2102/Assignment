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
#
class PerformanceAppraisalFormSerializer < BaseSerializer
  attributes  :id,
              :status,
              :active,
              :goals_set_staff,
              :goals_set_boss,
              :goals_with_company_staff,
              :goals_with_company_boss,
              :challenging_staff,
              :challenging_boss,
              :least_enjoy_staff,
              :least_enjoy_boss,
              :contribute_staff,
              :contribute_boss,
              :current_job_staff,
              :current_job_boss,
              :improvement_staff,
              :improvement_boss,
              :obstructing_staff,
              :obstructing_boss,
              :feedback_staff,
              :feedback_boss,
              :description_staff,
              :description_boss,
              :updated_at,
              :created_at,
              :start_date,
              :end_date,
              :staff,
              :boss
end
