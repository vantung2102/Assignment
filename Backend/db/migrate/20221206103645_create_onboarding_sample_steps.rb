class CreateOnboardingSampleSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :onboarding_sample_steps do |t|
      t.string :task
      t.references :position
      t.string :description

      t.timestamps
    end
  end
end
