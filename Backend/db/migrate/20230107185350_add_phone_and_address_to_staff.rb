class AddPhoneAndAddressToStaff < ActiveRecord::Migration[6.1]
  def change
    add_column :staffs, :phone, :string
    add_column :staffs, :address, :text
    add_column :staffs, :join_date, :date
  end
end
