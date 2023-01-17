require 'rails_helper'

RSpec.describe LeaveApplicationSerializer, type: :serializer do
  subject { described_class.new(leave) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let(:leave) { FactoryBot.create(:leave, staff_id: user.id) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  let!(:leave_application) do
    FactoryBot.create(:leave_application,
                      leave_type: LeaveApplication.leave_types[:casual_leave],
                      number_of_days_off: 1,
                      start_day: '2023-01-01',
                      end_day: '2023-01-01',
                      staff_id: user.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:leave_type) }
  it { is_expected.to serialize_attribute(:start_day) }
  it { is_expected.to serialize_attribute(:end_day) }
  it { is_expected.to serialize_attribute(:number_of_days_off) }
  it { is_expected.to serialize_attribute(:status) }
  it { is_expected.to serialize_attribute(:staff) }
  it { is_expected.to serialize_attribute(:approver) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end