class CreateOnboardingSteps < ActiveRecord::Migration[7.0]
  def change
    create_table :onboarding_steps, id: :uuid do |t|
      t.references :onboarding_sample_step
      t.references :staff_onboarding
      t.integer :assigned_person_id
      t.integer :status
      t.date :start_date
      t.date :due_date

      t.timestamps
    end
  end
end
