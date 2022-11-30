class CreateStaff < ActiveRecord::Migration[6.1]
  def change
    create_table :staffs do |t|
      t.string :fullname
      t.date :date_of_birth
      t.string :gender
      t.string :contract_name
      t.integer :status
      t.date :start_contract
      t.date :contract_term
      t.references :position
      t.references :department

      t.timestamps
    end
  end
end
 