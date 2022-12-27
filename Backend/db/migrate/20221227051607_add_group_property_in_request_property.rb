class AddGroupPropertyInRequestProperty < ActiveRecord::Migration[6.1]
  def change
    add_reference :request_properties, :group_property, null: true, foreign_key: true
  end
end
