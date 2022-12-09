class AddDeletedAtToStaff < ActiveRecord::Migration[6.1]
  def change
    add_column :staffs, :deleted_at, :datetime
    add_index :staffs, :deleted_at
  end
end
