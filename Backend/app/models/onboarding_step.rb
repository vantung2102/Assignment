# == Schema Information
#
# Table name: onboarding_steps
#
#  id                        :bigint           not null, primary key
#  onboarding_sample_step_id :bigint
#  staff_onboarding_id       :bigint
#  assigned_person_id        :integer
#  status                    :integer
#  start_date                :date
#  due_date                  :date
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#
class OnboardingStep < ApplicationRecord
  enum status: { outstanding: 0, completed: 1 }
  belongs_to :onboarding_sample_step
  belongs_to :staff_onboarding
  belongs_to :assigned_person, class_name: 'Staff', optional: true
end
