require 'rails_helper'

RSpec.describe OnboardingSampleStep, type: :model do
  it { should have_many(:onboarding_steps) }
  it { should belong_to(:position) }

  it { is_expected.to validate_presence_of(:task) }
  it { is_expected.to validate_presence_of(:description) }
  it { is_expected.to validate_length_of(:description).is_at_least(5) }
end
