class CreateProvideAsset < ActiveRecord::Migration[7.0]
  def change
    create_table :property_providing_histories, id: :uuid do |t|
      t.integer :provider_id
      t.integer :receiver_id
      t.references :property
      t.integer :status

      t.timestamps
    end
  end
end
