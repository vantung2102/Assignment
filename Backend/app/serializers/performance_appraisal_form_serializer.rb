# == Schema Information
#
# Table name: performance_appraisal_forms
#
#  id                       :bigint           not null, primary key
#  status                   :integer
#  staff_id                 :integer
#  boss_id                  :integer
#  active                   :boolean          default(FALSE)
#  goals_set_staff          :text
#  goals_set_boss           :text
#  achievement_staff        :text
#  achievement_boss         :text
#  goals_with_company_staff :text
#  goals_with_company_boss  :text
#  challenging_staff        :text
#  challenging_boss         :text
#  least_enjoy_staff        :text
#  least_enjoy_boss         :text
#  contribute_staff         :text
#  contribute_boss          :text
#  current_job_staff        :text
#  current_job_boss         :text
#  improvement_staff        :text
#  improvement_boss         :text
#  obstructing_staff        :text
#  obstructing_boss         :text
#  feedback_staff           :text
#  feedback_boss            :text
#  description_staff        :text
#  description_boss         :text
#  start_date               :date
#  end_date                 :date
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#
class PerformanceAppraisalFormSerializer < BaseSerializer
  attributes  :id,
              :status,
              :active,
              :goals_set_staff,
              :goals_set_boss,
              :achievement_staff,
              :achievement_boss,
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
