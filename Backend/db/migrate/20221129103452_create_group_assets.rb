class CreateGroupAssets < ActiveRecord::Migration[6.1]
  def change
    create_table :group_assets do |t|
      t.string :name

      t.timestamps
    end
  end
end
