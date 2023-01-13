require 'rails_helper'

RSpec.describe GroupProperty, type: :model do
  it { should have_many(:properties).dependent(:destroy) }
  it { should have_many(:request_properties).dependent(:destroy) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:description) }
end
