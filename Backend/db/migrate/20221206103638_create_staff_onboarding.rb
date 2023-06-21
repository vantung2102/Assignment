class CreateStaffOnboarding < ActiveRecord::Migration[7.0]
  def change
    create_table :staff_onboardings, id: :uuid do |t|
      t.references :staff
      t.boolean :active
      t.integer :position_id
      t.string :description

      t.timestamps
    end
  end
end
