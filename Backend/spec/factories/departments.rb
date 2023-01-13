FactoryBot.define do
  factory :department do
    name { Faker::Name.name }
    description { Faker::Lorem.sentence }
  end
end
