FactoryBot.define do
  factory :property_providing_history do
    provider_id { nil }
    receiver_id { nil }
    property_id { nil }
    status { :provided }
  end
end
