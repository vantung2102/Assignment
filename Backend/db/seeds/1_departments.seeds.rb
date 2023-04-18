# frozen_string_literal: true

ActiveRecord::Base.transaction do
  Department.destroy_all
  p 'Creating departments...'
  resources = [
    [1, 'Board of Directors'],
    [2, 'Learning & Development'],
    [3, 'Ruby Alpha'],
    [4, 'Ruby Gamma'],
    [5, 'JS Delta'],
    [6, 'JS Epsilon'],
    [7, 'JS Zeta'],
    [8, 'PHP Eta'],
    [9, 'PHP Theta'],
    [10, 'Python'],
    [11, 'Mobile'],
    [12, 'Quality Control'],
    [13, 'Project Coordinator'],
    [14, 'Business'],
    [15, 'HR'],
    [16, 'Accountant']
  ]
  resources.each_with_index do |resource, index|
    Department.create!(id: index + 1, name: resource[1], description: "description for #{resource[1]} department")
  end
  ActiveRecord::Base.connection.reset_pk_sequence!('departments')
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
