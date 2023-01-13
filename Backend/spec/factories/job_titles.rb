FactoryBot.define do
  factory :job_title do
    title { Faker::Name.name }
    description { Faker::Lorem.sentence }
  end
end
