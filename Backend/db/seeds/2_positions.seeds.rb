# frozen_string_literal: true

ActiveRecord::Base.transaction do
  Position.destroy_all
  p 'Creating positions...'
  resources = [
    [1, 'CEO'],
    [2, 'CTO'],
    [3, 'Operation Manager'],
    [4, 'HR Manager'],
    [5, 'Engineering Manager'],
    [6, 'Technical Leader'],
    [7, 'Engineering Supervisor'],
    [8, 'Engineering'],
    [9, 'PC Leader'],
    [10, 'PC'],
    [11, 'QC Leader'],
    [12, 'QC'],
    [13, 'Business Devlopment Lead'],
    [14, 'Business Devlopment'],
    [15, 'Product'],
    [16, 'Secretary'],
    [17, 'Tranining'],
    [18, 'Internal'],
    [19, 'Recruitment'],
    [20, 'Accountant'],
    [21, 'Admin'],
    [22, 'Intern']
  ]
  resources.each do |resource|
    Position.create!(id: resource[0], name: resource[1], description: "description for #{resource[1]} position")
  end
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
