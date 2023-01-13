FactoryBot.define do
  factory :staff do
    fullname { Faker::Name.name }
    date_of_birth { '2001-02-21'}
    gender { 'men' }
    status { nil }
    phone { '0984235062' }
    email { 'vantung2102@gmail.com' }
    password { 'Levantung123@' }
    address { Faker::Address.full_address }
    position_id { nil }
    department_id { nil }
    staff_id { nil }
    job_title_id { nil }
  end
end
