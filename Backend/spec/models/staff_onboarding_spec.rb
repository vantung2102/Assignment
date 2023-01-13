require 'rails_helper'

RSpec.describe StaffOnboarding, type: :model do
  it { is_expected.to belong_to(:staff) }
  it { is_expected.to belong_to(:position) }
end
