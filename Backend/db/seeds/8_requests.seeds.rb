# frozen_string_literal: true

ActiveRecord::Base.transaction do
  RequestProperty.destroy_all
  staff_ids = Staff.pluck(:id)
  group_property_ids = GroupProperty.pluck(:id)
  p 'Creating requests...'
  50.times do
    RequestProperty.create!(
      request_type: :device,
      status: :pending,
      requester_id: rand(1..staff_ids.size),
      group_property_id: rand(1..group_property_ids.size),
      reason: Faker::Lorem.paragraph,
      description: Faker::Lorem.paragraph
    )
  end
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
