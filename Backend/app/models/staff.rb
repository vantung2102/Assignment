class Staff < ApplicationRecord
  enum status: { effective: 0, expires: 1, pause: 2 }

  belongs_to :upper_level, class_name: 'Staff', optional: true, foreign_key: :staff_id
  has_many :lower_levels, class_name: 'Staff'

  belongs_to :position
  belongs_to :department

  validates :fullname, presence: true
  validates :contract_name, presence: true
  validates :contract_term, presence: true

  private

  def self.chart
    Staff.find_by_sql(
      "WITH RECURSIVE generation AS (
        SELECT id,
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
            0 AS level
        FROM staffs
        WHERE staff_id IS NULL
      
      UNION
      
        SELECT staffs.id,
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
            level + 1 AS level
        FROM staffs
        JOIN generation g
          ON g.id = staffs.staff_id
      )
      
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
              level
      FROM generation
      ;"
    )
  end
end