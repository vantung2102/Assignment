FactoryBot.define do
  factory :onboarding_sample_step do
    task { Faker::Lorem.sentence }
    position_id { nil }
    description { Faker::Lorem.paragraph }
  end
end
