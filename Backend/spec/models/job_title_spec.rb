require 'rails_helper'

RSpec.describe JobTitle, type: :model do
  it { should have_many(:staffs) }
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:description) }
end