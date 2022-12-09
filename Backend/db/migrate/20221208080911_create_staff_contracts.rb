class CreateStaffContracts < ActiveRecord::Migration[6.1]
  def change
    create_table :staff_contracts do |t|
      t.string :title
      t.references :staff
      t.date :start_date
      t.date :end_date
      t.integer :status
      t.string :description

      t.timestamps
    end

    remove_column :staffs, :contract_name, :string
    remove_column :staffs, :start_contract, :date
    remove_column :staffs, :contract_term, :date
  end
end
