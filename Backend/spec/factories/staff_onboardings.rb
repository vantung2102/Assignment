FactoryBot.define do
  factory :staff_onboarding do
    staff_id { nil }
    active { true }
    position_id { nil }
    description { Faker::Lorem.sentence }
  end
end
