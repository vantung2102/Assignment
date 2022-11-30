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

1.times do
  staff = Staff.create(
    fullname: Faker::Name.name,
    contract_name: Faker::Lorem.paragraph,
    date_of_birth: Date.new,
    start_contract: Date.new,
    gender: 'men',
    contract_term: Date.new,
    status: rand(0..2),
    position_id: rand(1..10),
    department_id: rand(1..10),
    staff_id: nil
  )
end