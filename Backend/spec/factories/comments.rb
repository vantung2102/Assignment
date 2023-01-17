FactoryBot.define do
  factory :comment do
    content { Faker::Lorem.sentence }
    commentable_id { rand(1..100) }
    commentable_type { 'RequestProperty' }
    staff_id { nil }
  end
end
