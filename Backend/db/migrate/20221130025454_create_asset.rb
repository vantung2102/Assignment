class CreateAsset < ActiveRecord::Migration[6.1]
  def change
    create_table :properties do |t|
      t.string :code_seri
      t.string :name
      t.string :brand
      t.references :group_property
      t.float :price
      t.datetime :date_buy
      t.integer :number_of_repairs
      t.integer :status

      t.timestamps
    end
  end
end
