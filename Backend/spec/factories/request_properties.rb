FactoryBot.define do
  factory :request_property do
    request_type { :device }
    description { Faker::Lorem.sentence }
    reason { Faker::Lorem.sentence }
    status { :pending }
    requester_id { nil }
    approver_id { nil }
    group_property_id { nil }
  end
end
