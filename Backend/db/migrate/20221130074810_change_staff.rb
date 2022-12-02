class ChangeStaff < ActiveRecord::Migration[6.1]
  def change
    add_column :staffs, :email, :string, :after => "fullname"
    add_column :staffs, :password_digest, :string, :after => "email"
  end
end
