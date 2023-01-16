FactoryBot.define do
  factory :onboarding_step do
    status { :outstanding }
    start_date { '2023-01-15' }
    due_date { '2023-01-16' }
    assigned_person_id { nil }
    onboarding_sample_step_id { nil }
    staff_onboarding_id{ nil }
  end
end
