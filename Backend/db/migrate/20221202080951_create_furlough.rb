class CreateFurlough < ActiveRecord::Migration[7.0]
  def change
    create_table :leaves, id: :uuid do |t|
      t.references :staff
      t.float :casual_leave
      t.float :marriage_leave
      t.float :compassionate_leave
      t.float :paternity_leave
      t.float :maternity_leave
      t.float :unpaid_leave
      t.float :allowed_number_of_days_off
      t.string :description

      t.timestamps
    end
  end
end
