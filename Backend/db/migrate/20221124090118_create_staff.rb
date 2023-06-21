class CreateStaff < ActiveRecord::Migration[7.0]
  def change
    create_table :staffs, id: :uuid do |t|
      t.string :fullname
      t.date :date_of_birth
      t.string :gender
      t.string :contract_name
      t.text :address
      t.date :join_date
      t.integer :status
      t.date :start_contract
      t.date :contract_term
      t.references :position
      t.references :department
      t.string :email, null: false, default: ''
      t.string :password_digest, null: false, default: ''
      t.string :google_uid, index: true
      t.string :apple_uid, index: true
      t.string :phone_code
      t.string :phone_number
      t.datetime :email_verified_at
      t.string :email_verification_token
      t.datetime :email_verification_sent_at
      t.string :reset_password_token
      t.datetime :reset_password_sent_at

      t.timestamps
    end
  end
end
