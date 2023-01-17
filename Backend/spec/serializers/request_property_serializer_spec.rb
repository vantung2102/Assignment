require 'rails_helper'

RSpec.describe RequestPropertySerializer, type: :serializer do
  subject { described_class.new(request_property) }

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
  let(:request_property) do
    FactoryBot.create(:request_property, requester_id: user.id,
                                         approver_id: user.id,
                                         group_property_id: group_property.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:status) }
  it { is_expected.to serialize_attribute(:request_type) }
  it { is_expected.to serialize_attribute(:reason) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:requester) }
  it { is_expected.to serialize_attribute(:approver) }
  it { is_expected.to serialize_attribute(:group_property) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end