require 'rails_helper'

RSpec.describe PropertyProvidingHistorySerializer, type: :serializer do
  subject { described_class.new(property_providing_history) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end
  let(:group_property) { FactoryBot.create(:group_property) }
  let(:property) { FactoryBot.create(:property, group_property_id: group_property.id) }
  let(:property_providing_history) do
    FactoryBot.create(:property_providing_history,
                      provider_id: user.id,
                      receiver_id: user.id,
                      property_id: property.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:provider) }
  it { is_expected.to serialize_attribute(:receiver) }
  it { is_expected.to serialize_attribute(:property) }
  it { is_expected.to serialize_attribute(:status) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end