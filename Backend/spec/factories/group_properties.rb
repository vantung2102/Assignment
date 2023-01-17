FactoryBot.define do
  factory :group_property do
    name { Faker::Name.name }
    description { Faker::Lorem.sentence }
  end
end
