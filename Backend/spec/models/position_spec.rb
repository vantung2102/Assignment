require 'rails_helper'

RSpec.describe Position, type: :model do
  it { should have_many(:staff_onboardings) }
  it { should have_many(:onboarding_sample_steps) }
  it { should have_one(:staff) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:description) }
  it { is_expected.to validate_length_of(:description).is_at_least(5) }
end
