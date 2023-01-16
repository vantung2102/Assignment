FactoryBot.define do
  factory :performance_appraisal_form do
    status { :in_progress }
    staff_id { nil }
    boss_id { nil }
    start_date {  '2023-01-15' }
    end_date {  '2023-01-16' }
  end
end
