# frozen_string_literal: true

ActiveRecord::Base.transaction do
  OnboardingSampleStep.destroy_all
  p 'Creating Onboarding Sample Step...'
  positions = Position.all
  positions.each do |position|
    5.times do |time|
      OnboardingSampleStep.create!(
        task: "#{time}. Onboarding Sample for #{position.name}",
        position_id: position.id,
        description: "description for #{position.name} position Onboarding Sample"
      )
    end
  end
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
