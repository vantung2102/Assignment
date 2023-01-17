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
class PerformanceAppraisalForm < ApplicationRecord
  enum status: { in_progress: 1, self_reviewed: 2, completed: 3 }, _suffix: true

  belongs_to :staff
  belongs_to :boss, class_name: :Staff, optional: true

  validates :status, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
end

# == Question
#
# 1. goals_set: How did you do on the goals set for you during your last performance appraisal? 
# 2. achievement: What was your biggest achievement this year?
# 3. term goals: What are your short-and long-term goals with the company, and for your career?
# 4. goals_with_company: What has been the most challenging aspect of your work this past year and why?
# 5. least enjoy: Which parts of your job do you most / least enjoy?
# 6. contribute_staff: In what ways might you contribute more to the company?
# 7. current_job_staff: Do you feel that your current job and responsibilities are aligned with your future goals?
# 8. improvement_staff: Are you happy with the company’s culture? Do you feel that there is any scope for improvement?
# 9. obstructing_staff: Is there anyone or anything that is obstructing your performance in this company?
# 10. feedback_staff: Do you feel that you receive adequate feedback? How frequent feedback do you prefer
