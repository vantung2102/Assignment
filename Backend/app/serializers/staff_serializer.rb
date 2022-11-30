class StaffSerializer < BaseSerializer
  attributes  :id,
              :fullname,
              :contract_name,
              :date_of_birth,
              :start_contract,
              :gender,
              :contract_term,
              :status,
              :position,
              :department,
              :staff_id
end