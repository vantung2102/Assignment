class CreateDepartment < ActiveRecord::Migration[7.0]
  def change
    enable_extension 'pgcrypto'
  end

  def change
    create_table :departments, id: :uuid do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
