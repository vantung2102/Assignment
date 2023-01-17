require 'rails_helper'

RSpec.describe PropertySerializer, type: :serializer do
  subject { described_class.new(property) }

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

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:code_seri) }
  it { is_expected.to serialize_attribute(:name) }
  it { is_expected.to serialize_attribute(:brand) }
  it { is_expected.to serialize_attribute(:group_property) }
  it { is_expected.to serialize_attribute(:price) }
  it { is_expected.to serialize_attribute(:date_buy) }
  it { is_expected.to serialize_attribute(:number_of_repairs) }
  it { is_expected.to serialize_attribute(:status) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end