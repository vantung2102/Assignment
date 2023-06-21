class CreateComment < ActiveRecord::Migration[7.0]
  def change
    create_table :comments, id: :uuid do |t|
      t.references :staff
      t.references :commentable, :polymorphic => true
      t.string :content

      t.timestamps
    end
  end
end
