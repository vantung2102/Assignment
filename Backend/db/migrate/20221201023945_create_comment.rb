class CreateComment < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :staff
      t.references :commentable, :polymorphic => true
      t.string :content

      t.timestamps
    end
  end
end
