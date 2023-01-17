require 'rails_helper'

RSpec.describe DepartmentSerializer, type: :serializer do
  subject { described_class.new(department) }

  let(:department) { FactoryBot.create(:department) }

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:name) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end