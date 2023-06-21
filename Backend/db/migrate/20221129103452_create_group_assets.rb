class CreateGroupAssets < ActiveRecord::Migration[7.0]
  def change
    create_table :group_properties, id: :uuid do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
