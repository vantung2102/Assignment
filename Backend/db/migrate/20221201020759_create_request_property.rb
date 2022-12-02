class CreateRequestProperty < ActiveRecord::Migration[6.1]
  def change
    create_table :request_properties do |t|
      t.integer :request_type
      t.string :description
      t.string :reason
      t.integer :status
      t.integer :requester_id
      t.integer :approver_id

      t.timestamps
    end
  end
end
