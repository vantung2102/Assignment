require 'rails_helper'

RSpec.describe GroupPropertySerializer, type: :serializer do
  subject { described_class.new(group_property) }

  let(:group_property) { FactoryBot.create(:group_property) }

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:name) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end