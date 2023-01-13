FactoryBot.define do
  factory :leave do
    staff_id { nil }
    casual_leave { 0 }
    unpaid_leave { 0 }
    marriage_leave { 0 }
    compassionate_leave { 0 }
    paternity_leave { 0 }
    maternity_leave { 0 }
    allowed_number_of_days_off { 12 }
    description { Faker::Lorem.sentence }
  end
end
