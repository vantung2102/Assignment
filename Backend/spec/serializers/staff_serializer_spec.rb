require 'rails_helper'

RSpec.describe StaffSerializer, type: :serializer do
  subject { described_class.new(user) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:fullname) }
  it { is_expected.to serialize_attribute(:email) }
  it { is_expected.to serialize_attribute(:phone) }
  it { is_expected.to serialize_attribute(:address) }
  it { is_expected.to serialize_attribute(:join_date) }
  it { is_expected.to serialize_attribute(:date_of_birth) }
  it { is_expected.to serialize_attribute(:gender) }
  it { is_expected.to serialize_attribute(:status) }
  it { is_expected.to serialize_attribute(:position) }
  it { is_expected.to serialize_attribute(:department) }
  it { is_expected.to serialize_attribute(:job_title) }
  it { is_expected.to serialize_attribute(:upper_level) }
  it { is_expected.to serialize_attribute(:lower_levels) }
  it { is_expected.to serialize_attribute(:roles) }
end