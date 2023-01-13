FactoryBot.define do
  factory :position do
    name { Faker::Name.name }
    description { Faker::Lorem.sentence }
  end
end
