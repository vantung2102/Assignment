require 'rails_helper'

RSpec.describe PositionSerializer, type: :serializer do
  subject { described_class.new(position) }

  let(:position) { FactoryBot.create(:position) }

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:name) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end