class Staffs::StaffChartService < ApplicationService
  def call
    Staff.find_by_sql(
      "WITH RECURSIVE generation AS (
        SELECT  id,
                fullname,
                status,
                position_id,
                department_id,
                staff_id,
                deleted_at,
                0 as level
        FROM staffs
        WHERE staff_id IS NULL
      
      UNION
      
        SELECT  staffs.id,
                staffs.fullname,
                staffs.status,
                staffs.position_id,
                staffs.department_id,
                staffs.staff_id,
                staffs.deleted_at,
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
      WHERE deleted_at IS NULL
      ;"
    )
  end
end