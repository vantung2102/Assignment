FactoryBot.define do
  factory :property do
    code_seri { Faker::Code.nric }
    name { Faker::Name.name }
    brand { Faker::Commerce.brand}
    group_property_id { nil }
    price { 100000 }
    date_buy { Faker::Date.in_date_period(month: 2) }
    number_of_repairs { 1 }
    status { :available }
  end
end
