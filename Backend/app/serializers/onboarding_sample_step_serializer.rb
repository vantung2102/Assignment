# == Schema Information
#
# Table name: onboarding_sample_steps
#
#  id          :bigint           not null, primary key
#  task        :string
#  position_id :bigint
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class OnboardingSampleStepSerializer < BaseSerializer
  attributes  :id,
              :position,
              :description,
              :task,
              :created_at,
              :updated_at
end
