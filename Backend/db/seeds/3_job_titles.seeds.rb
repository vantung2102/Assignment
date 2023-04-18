# frozen_string_literal: true

ActiveRecord::Base.transaction do
  JobTitle.destroy_all
  p 'Creating job titles...'
  resources = [
    [1, 'Senior'],
    [2, 'Junior'],
    [3, 'Middle'],
    [4, 'Fresher'],
    [5, 'Intern']
  ]
  resources.each_with_index do |resource, index|
    JobTitle.create!(id: index + 1, title: resource[1], description: "description for #{resource[1]} job title")
  end
  ActiveRecord::Base.connection.reset_pk_sequence!('job_titles')
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
