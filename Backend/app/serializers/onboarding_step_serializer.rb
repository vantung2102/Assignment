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
class OnboardingStepSerializer < BaseSerializer
  attributes  :id,
              :onboarding_sample_step,
              :staff_onboarding,
              :assigned_person,
              :status,
              :start_date,
              :due_date,
              :created_at,
              :updated_at
end
