# frozen_string_literal: true

ActiveRecord::Base.transaction do
  Staff.destroy_all
  p 'Creating staffs...'

  POSITIONS = { CEO: 1, CTO: 2, OM: 3, HRM: 4, EM: 5, TL: 6, ES: 7, Engineering: 8, PCL: 9, PC: 10, QCL: 11, QC: 12, BDL: 13,
                BD: 14, Product: 15, Secretary: 16, Tranining: 17, Internal: 18, Recruitment: 19, Accountant: 20, Admin: 21, Intern: 22 }.freeze

  DEPARTMENTS = { BOD: 1, LD: 2, RA: 3, RG: 4, JSD: 5, JSE: 6, JSZ: 7, PE: 8, PT: 9, Python: 10, Mobile: 11, QC: 12,
                  PC: 13, Business: 14, HR: 15, Accountant: 16 }.freeze

  JOBTITLES = { Senior: 1, Junior: 2, Middle: 3, Fresher: 4, Intern: 5 }.freeze

  resources = [
    # [id, position_id, job_title_id, department_id, staff_id]
    [1, POSITIONS[:CEO], JOBTITLES[:Senior], DEPARTMENTS[:BOD], nil],

    [2, POSITIONS[:CTO], JOBTITLES[:Senior], DEPARTMENTS[:BOD], 1],
    [3, POSITIONS[:OM], JOBTITLES[:Senior], DEPARTMENTS[:BOD], 1],
    [4, POSITIONS[:HRM], JOBTITLES[:Senior], DEPARTMENTS[:BOD], 1],

    [5, POSITIONS[:EM], JOBTITLES[:Senior], DEPARTMENTS[:BOD], 2],
    [6, POSITIONS[:TL], JOBTITLES[:Senior], DEPARTMENTS[:BOD], 2],
    [7, POSITIONS[:PCL], JOBTITLES[:Senior], DEPARTMENTS[:BOD], 2],
    [8, POSITIONS[:QCL], JOBTITLES[:Senior], DEPARTMENTS[:BOD], 2],

    [9, POSITIONS[:ES], JOBTITLES[:Senior], DEPARTMENTS[:BOD], 5],

    [10, POSITIONS[:BDL], JOBTITLES[:Senior], DEPARTMENTS[:Business], 3],

    [11, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:RA], 9],
    [12, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:RG], 9],
    [13, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:JSD], 9],
    [14, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:JSE], 9],
    [15, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:JSZ], 9],

    [16, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:PE], 6],
    [17, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:PT], 6],
    [18, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:Python], 6],
    [19, POSITIONS[:Engineering], JOBTITLES[:Senior], DEPARTMENTS[:Mobile], 6],

    [20, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:RA], 11],
    [21, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:RA], 11],
    [22, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:RA], 11],
    [23, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:RA], 11],

    [24, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:RG], 12],
    [25, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:RG], 12],
    [26, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:RG], 12],
    [27, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:RG], 12],

    [28, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:JSD], 13],
    [29, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:JSD], 13],
    [30, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:JSD], 13],
    [31, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:JSD], 13],

    [32, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:JSE], 14],
    [33, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:JSE], 14],
    [34, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:JSE], 14],
    [35, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:JSE], 14],

    [36, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:JSZ], 15],
    [37, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:JSZ], 15],
    [38, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:JSZ], 15],
    [39, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:JSZ], 15],

    [40, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:PE], 16],
    [41, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:PE], 16],
    [42, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:PE], 16],
    [43, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:PE], 16],

    [44, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:PT], 17],
    [45, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:PT], 17],
    [46, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:PT], 17],
    [47, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:PT], 17],

    [48, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:Python], 18],
    [49, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:Python], 18],
    [50, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:Python], 18],
    [51, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:Python], 18],

    [52, POSITIONS[:Engineering], JOBTITLES[:Junior], DEPARTMENTS[:Mobile], 19],
    [53, POSITIONS[:Engineering], JOBTITLES[:Middle], DEPARTMENTS[:Mobile], 19],
    [54, POSITIONS[:Engineering], JOBTITLES[:Fresher], DEPARTMENTS[:Mobile], 19],
    [55, POSITIONS[:Intern], JOBTITLES[:Intern], DEPARTMENTS[:Mobile], 19],

    [56, POSITIONS[:QC], JOBTITLES[:Junior], DEPARTMENTS[:QC], 8],
    [57, POSITIONS[:QC], JOBTITLES[:Middle], DEPARTMENTS[:QC], 8],
    [58, POSITIONS[:QC], JOBTITLES[:Fresher], DEPARTMENTS[:QC], 8],
    [59, POSITIONS[:QC], JOBTITLES[:Intern], DEPARTMENTS[:QC], 8],

    [60, POSITIONS[:PC], JOBTITLES[:Junior], DEPARTMENTS[:PC], 9],
    [61, POSITIONS[:PC], JOBTITLES[:Middle], DEPARTMENTS[:PC], 9],
    [62, POSITIONS[:PC], JOBTITLES[:Fresher], DEPARTMENTS[:PC], 9],
    [63, POSITIONS[:PC], JOBTITLES[:Intern], DEPARTMENTS[:PC], 9],

    [64, POSITIONS[:BD], JOBTITLES[:Junior], DEPARTMENTS[:Business], 10],
    [65, POSITIONS[:BD], JOBTITLES[:Middle], DEPARTMENTS[:Business], 10],

    [66, POSITIONS[:Product], JOBTITLES[:Fresher], DEPARTMENTS[:HR], 10],
    [67, POSITIONS[:Product], JOBTITLES[:Intern], DEPARTMENTS[:HR], 10],

    [68, POSITIONS[:Secretary], JOBTITLES[:Junior], DEPARTMENTS[:Business], 10],

    [69, POSITIONS[:Tranining], JOBTITLES[:Middle], DEPARTMENTS[:HR], 4],
    [70, POSITIONS[:Tranining], JOBTITLES[:Fresher], DEPARTMENTS[:HR], 4],

    [71, POSITIONS[:Internal], JOBTITLES[:Intern], DEPARTMENTS[:HR], 4],
    [72, POSITIONS[:Internal], JOBTITLES[:Junior], DEPARTMENTS[:HR], 4],

    [73, POSITIONS[:Recruitment], JOBTITLES[:Middle], DEPARTMENTS[:HR], 4],
    [74, POSITIONS[:Recruitment], JOBTITLES[:Fresher], DEPARTMENTS[:HR], 4],

    [75, POSITIONS[:Accountant], JOBTITLES[:Senior], DEPARTMENTS[:Accountant], 1],
    [76, POSITIONS[:Accountant], JOBTITLES[:Intern], DEPARTMENTS[:Accountant], 1]
  ]

  resources.each_with_index do |resource, index|
    name = Faker::Name.unique.last_name
    Staff.create!(
      id: index + 1,
      fullname: name,
      date_of_birth: Faker::Date.between(from: '1990-01-01', to: '2003-01-01'),
      gender: Faker::Gender.binary_type,
      position_id: resource[1],
      job_title_id: resource[2],
      department_id: resource[3],
      staff_id: resource[4],
      password: "#{name}@123",
      email: "#{name}@gmail.com",
      phone: '0984235062',
      address: Faker::Address.full_address
    )
  end

  { 77 => 'Jenna', 78 => 'Janna' }.each do |key, value|
    Staff.create!(
      id: key,
      fullname: value,
      date_of_birth: Faker::Date.between(from: '1990-01-01', to: '2003-01-01'),
      gender: Faker::Gender.binary_type,
      position_id: POSITIONS[:Admin],
      job_title_id: JOBTITLES[:Junior],
      department_id: DEPARTMENTS[:HR],
      staff_id: 4,
      password: "#{value}@123",
      email: "#{value}@gmail.com",
      phone: '0984235062',
      address: Faker::Address.full_address
    )
  end

  Staff.where(id: [1, 2, 3, 4, 77,78]).map {|staff| staff.add_role(:Manager)}
  ActiveRecord::Base.connection.reset_pk_sequence!('staffs')
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
