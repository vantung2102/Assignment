class CreateFurloughDetail < ActiveRecord::Migration[7.0]
  def change
    create_table :leave_applications, id: :uuid do |t|
      t.integer :leave_type
      t.float :number_of_days_off
      t.date :start_day
      t.date :end_day
      t.integer :status
      t.integer :staff_id
      t.integer :approver_id
      t.string :description

      t.timestamps
    end
  end
end
