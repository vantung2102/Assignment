class CreateJobTitle < ActiveRecord::Migration[7.0]
  def change
    create_table :job_titles, id: :uuid do |t|
      t.string :title
      t.string :description

      t.timestamps
    end

    add_reference :staffs, :job_title, null: true, foreign_key: true
  end
end
