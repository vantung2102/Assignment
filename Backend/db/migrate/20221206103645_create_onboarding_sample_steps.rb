class CreateOnboardingSampleSteps < ActiveRecord::Migration[7.0]
  def change
    create_table :onboarding_sample_steps, id: :uuid do |t|
      t.string :task
      t.references :position
      t.string :description

      t.timestamps
    end
  end
end
