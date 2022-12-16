class CreatePaForm < ActiveRecord::Migration[6.1]
  def change
    create_table :performance_appraisal_forms do |t|
      t.integer :status
      t.integer :staff_id
      t.integer :boss_id
      t.boolean :active, default: false
      
      t.text :goals_set_staff
      t.text :goals_set_boss
      
      t.text :achievement_staff
      t.text :achievement_boss
      
      t.text :goals_with_company_staff
      t.text :goals_with_company_boss

      t.text :challenging_staff
      t.text :challenging_boss

      t.text :least_enjoy_staff
      t.text :least_enjoy_boss

      t.text :contribute_staff
      t.text :contribute_boss

      t.text :current_job_staff
      t.text :current_job_boss

      t.text :improvement_staff
      t.text :improvement_boss

      t.text :obstructing_staff
      t.text :obstructing_boss

      t.text :feedback_staff
      t.text :feedback_boss
      
      t.text :description_staff
      t.text :description_boss

      t.date :start_date
      t.date :end_date
      
      t.timestamps
    end
  end
end
