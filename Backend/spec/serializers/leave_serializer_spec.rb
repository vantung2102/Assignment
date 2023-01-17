require 'rails_helper'

RSpec.describe LeaveSerializer, type: :serializer do
  subject { described_class.new(leave) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let(:leave) { FactoryBot.create(:leave, staff_id: user.id) }
  let(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:staff) }
  it { is_expected.to serialize_attribute(:casual_leave) }
  it { is_expected.to serialize_attribute(:marriage_leave) }
  it { is_expected.to serialize_attribute(:compassionate_leave) }
  it { is_expected.to serialize_attribute(:paternity_leave) }
  it { is_expected.to serialize_attribute(:maternity_leave) }
  it { is_expected.to serialize_attribute(:unpaid_leave) }
  it { is_expected.to serialize_attribute(:allowed_number_of_days_off) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end