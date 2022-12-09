class CreateStaffOnboarding < ActiveRecord::Migration[6.1]
  def change
    create_table :staff_onboardings do |t|
      t.references :staff
      t.boolean :active
      t.integer :position_id
      t.string :description

      t.timestamps
    end
  end
end
