class CreateGroupAssets < ActiveRecord::Migration[6.1]
  def change
    create_table :group_properties do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
