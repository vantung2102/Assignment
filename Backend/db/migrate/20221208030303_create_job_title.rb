class CreateJobTitle < ActiveRecord::Migration[6.1]
  def change
    create_table :job_titles do |t|
      t.string :title
      t.string :description

      t.timestamps
    end

    add_reference :staffs, :job_title, null: true, foreign_key: true
  end
end
