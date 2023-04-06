# frozen_string_literal: true

ActiveRecord::Base.transaction do
  LeaveApplication.destroy_all
  staff_ids = Staff.pluck(:id)
  p 'Creating leave application...'
  50.times do
    LeaveApplication.create!(
      leave_type: :casual_leave,
      status: :pending,
      number_of_days_off: 1,
      start_day: '2023-01-15',
      end_day: '2023-01-15',
      staff_id: rand(1..staff_ids.size),
      description: Faker::Lorem.paragraph
    )
  end
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
