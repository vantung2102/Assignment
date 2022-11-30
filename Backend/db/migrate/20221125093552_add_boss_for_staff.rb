class AddBossForStaff < ActiveRecord::Migration[6.1]
  def change
    add_reference :staffs, :staff, null: true, foreign_key: true
  end
end
