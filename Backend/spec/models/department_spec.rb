require 'rails_helper'

RSpec.describe Department, type: :model do
  it { should have_one(:staff) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:description) }
  it { is_expected.to validate_length_of(:description).is_at_most(500).is_at_least(5) }
end
