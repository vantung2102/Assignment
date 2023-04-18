# frozen_string_literal: true

ActiveRecord::Base.transaction do
  Role.destroy_all
  p 'Creating role...'
  resources = [
    [1, 'Manager'],
    [2, 'User'],
    [3, 'Admin'],
    [4, 'HR'],
    [5, 'Accountant']
  ]
  resources.each_with_index do |resource, index|
    Role.create!(id: index + 1, name: resource[1])
  end
  ActiveRecord::Base.connection.reset_pk_sequence!('roles')
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
