# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ActiveRecord::Base.transaction do
  15.times do
    Department.create!(
      name: Faker::Lorem.sentence,
      description: Faker::Lorem.paragraph
    )
  end

  15.times do
    Position.create!(
      name: Faker::Lorem.sentence,
      description: Faker::Lorem.paragraph,
    )
  end

  15.times do
    JobTitle.create!(
      title: Faker::Lorem.sentence,
      description: Faker::Lorem.paragraph,
    )
  end

  positions = Position.all.group_by(&:id).keys
  departments = Department.all.group_by(&:id).keys
  jobTitles = JobTitle.all.group_by(&:id).keys

  50.times do
    OnboardingSampleStep.create!(
      task: Faker::Name.name,
      position_id: positions[rand(positions.count)],
      description: Faker::Lorem.paragraph,
    )
  end

  admin = Staff.create!(
    fullname: Faker::Name.name,
    date_of_birth: '2001-21-02',
    gender: 'men',
    position_id: positions[rand(positions.count)],
    job_title_id: jobTitles[rand(jobTitles.count)],
    department_id: departments[rand(departments.count)],
    staff_id: nil,
    password: 'Levantung123@',
    email: 'admin@gmail.com',
    phone: '0984235062',
    address: Faker::Address.full_address
  )
  admin.add_role :Manager

  30.times do
    Staff.create!(
      fullname: Faker::Name.name,
      date_of_birth: '2001-21-02',
      gender: 'men',
      position_id: positions[rand(positions.count)],
      job_title_id: jobTitles[rand(jobTitles.count)],
      department_id: departments[rand(departments.count)],
      staff_id: nil,
      password: 'Levantung123@',
      email: Faker::Internet.email,
      phone: '0984235062',
      address: Faker::Address.full_address
    )
  end
  staffs = Staff.all.group_by(&:id).keys

  10.times do
    GroupProperty.create!(
      name: Faker::Commerce.brand,
      description: Faker::Lorem.paragraph
    )
  end

  groupProperties = GroupProperty.all.group_by(&:id).keys

  20.times do
    Property.create!(
      code_seri: Faker::Code.nric,
      name: Faker::Name.name,
      brand: Faker::Commerce.brand,
      group_property_id: groupProperties[rand(groupProperties.count)],
      price: rand(10000..100000000),
      date_buy: Date.new,
      number_of_repairs: rand(0..5),
      status: 0
    )
  end

  20.times do
    RequestProperty.create!(
      request_type: :device,
      status: :pending,
      requester_id: staffs[rand(staffs.count)],
      group_property_id: groupProperties[rand(groupProperties.count)],
      reason: Faker::Lorem.paragraph,
      description: Faker::Lorem.paragraph
    )
  end

  10.times do
    LeaveApplication.create!(
      leave_type: :casual_leave,
      status: :pending,
      number_of_days_off: 1,
      start_day: '2023-01-15',
      end_day: '2023-01-15',
      staff_id: staffs[rand(staffs.count)],
      description: Faker::Lorem.paragraph,
    )
  end
end
