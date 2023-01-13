FactoryBot.define do
  factory :leave_application do
    leave_type { :marriage_leave }
    number_of_days_off { nil }
    start_day { '2023-01-01' }
    end_day { '2023-01-02' }
    description { Faker::Lorem.sentence }
    staff_id { nil }
  end
end
