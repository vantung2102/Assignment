# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 50.times do
#   Department.create(
#     name: Faker::Lorem.sentence,
#     description: Faker::Lorem.paragraph
#   )
# end

# 10.times do
#   Position.create(
#     name: Faker::Lorem.sentence,
#     description: Faker::Lorem.paragraph,
#     department_id: rand(1..50)
#   )
# end

# 20.times do
#   Staff.create!(
#     fullname: Faker::Name.name,
#     # contract_name: Faker::Lorem.paragraph,
#     date_of_birth: Date.new,
#     # start_contract: Date.new,
#     gender: 'men',
#     # contract_term: Date.new,
#     status: 0,
#     position_id: 10,
#     job_title_id: nil,
#     department_id: rand(1..10),
#     staff_id: rand(16..20),
#     password: '123456',
#     email: Faker::Internet.email
#   )
# end

# 10.times do
#   GroupProperty.create(
#     name: Faker::Commerce.brand,
#     description: Faker::Lorem.paragraph
#   )
# end

# 20.times do
#   Property.create(
#     code_seri: Faker::Code.nric,
#     name: Faker::Name.name,
#     brand: Faker::Commerce.brand,
#     group_property_id: rand(1..10),
#     price: rand(10000..100000000),
#     date_buy: Faker::Date.in_date_period(month: 2),
#     number_of_repairs: rand(0..5),
#     status: 0
#   )
# end

# i = 0
# 20.times do
#   i+=1
#   ProvideAsset.create(
#     provider_id: 16,
#     receiver_id: rand(17..25),
#     asset_id: i,
#     date_provide: Faker::Date.in_date_period(month: 10),
#     date_recall: nil,
#     type_provide: 'ca nhan',
#   )
# end

# 20.times do
#   ProvideAsset.create(
#     provider_id: 16,
#     receiver_id: rand(17..25),
#     asset_id: i,
#     date_provide: Faker::Date.in_date_period(month: 10),
#     date_recall: nil,
#     type_provide: 'ca nhan',
#   )
# end

# Staff.first.each do |user|
  # Leave.create(
  #   staff_id: 16,
  #   casual_leave: 0,
  #   marriage_leave: 0,
  #   compassionate_leave: 0,
  #   paternity_leave: 0,
  #   maternity_leave: 0,
  #   unpaid_leave: 0,
  #   allowed_number_of_days_off: 12,
  #   description: Faker::Lorem.paragraph
  # )
# end

# Staff.all.each do |user|
#   5.times do 
    # LeaveApplication.create(
    #   staff_id: 16,
    #   leave_type: 2,
    #   number_of_days_off: 1,
    #   start_day: Faker::Date.between(from: '2022-12-01', to: '2022-12-05'),
    #   end_day: Faker::Date.between(from: '2022-12-06', to: '2022-12-10'),
    #   status: LeaveApplication.statuses[:pending],
    #   approver_id: nil,
    #   description: Faker::Lorem.paragraph
    # )
#   end
# end
# 1.times do
#   StaffOnboarding.create!(
#     staff_id: 16,
#     active: true,
#     description: Faker::Lorem.paragraph,
#     position_id: 3
#   )
# end

# 30.times do
#   OnboardingSampleStep.create!(
#     task: Faker::Lorem.sentence,
#     position_id: rand(2..6),
#     description: Faker::Lorem.paragraph
#   )
# end

# OnboardingSampleStep.where(position_id: 3).each do |item|
#   item.onboarding_steps.create!(
#     staff_onboarding_id: 1,
#     status: 0,
#   )
# end

# 30.times do
#   JobTitle.create!(
#     title: Faker::Lorem.sentence,
#   )
# end
