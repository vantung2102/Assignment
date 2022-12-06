class Staffs::StaffChartService < ApplicationService
  def call
    Staff.find_by_sql(
      "WITH RECURSIVE generation AS (
        SELECT  id,
                fullname,
                contract_name,
                date_of_birth,
                start_contract,
                gender,
                contract_term,
                status,
                position_id,
                department_id,
                staff_id,
                0 as level
        FROM staffs
        WHERE staff_id IS NULL
      
      UNION
      
        SELECT  staffs.id,
                staffs.fullname,
                staffs.contract_name,
                staffs.date_of_birth,
                staffs.start_contract,
                staffs.gender,
                staffs.contract_term,
                staffs.status,
                staffs.position_id,
                staffs.department_id,
                staffs.staff_id,
                level + 1 as level
        FROM staffs
        JOIN generation g
          ON g.id = staffs.staff_id
      )
      
      SELECT  id,
              fullname,
              position_id,
              department_id,
              staff_id,
              level
      FROM generation
      WHERE level <= 2
      ;"
    )
  end
end