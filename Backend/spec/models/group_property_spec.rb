require 'rails_helper'

RSpec.describe GroupProperty, type: :model do
  it { should have_many(:properties) }
  it { should have_many(:request_properties) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:description) }
end
