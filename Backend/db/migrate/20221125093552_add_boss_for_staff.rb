class AddBossForStaff < ActiveRecord::Migration[7.0]
  def change
    add_reference :staffs, :staff, null: true, foreign_key: true
  end
end
