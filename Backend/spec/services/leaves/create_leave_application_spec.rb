# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Leaves::CreateLeaveApplicationService, type: :service do
  subject { described_class.new(current_user, leave_application_params) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:current_user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end
  let(:leave) { FactoryBot.create(:leave, staff_id: current_user.id) }

  context 'leave application created success' do
    let!(:leave_application_params) do
      {
        leave_type: LeaveApplication.leave_types[:casual_leave],
        number_of_days_off: 1,
        start_day: '2023-01-01',
        end_day: '2023-01-01',
        description: Faker::Lorem.sentence
      }
    end

    describe '.call' do
      let!(:result) { subject.call }
      it { expect(result.first).to be true }
    end
  end

  context 'Leave application created faild' do
    let!(:leave_application_params) do
      {
        leave_type: LeaveApplication.leave_types[:marriage_leave],
        number_of_days_off: 4,
        start_day: '2023-01-01',
        end_day: '2023-01-04',
        description: Faker::Lorem.sentence
      }
    end

    describe '.call' do
      let!(:result) { subject.call }
      it { expect(result.first).to be false }
    end
  end

  context 'Type Leave application invalid' do
    let!(:leave_application_params) do
      {
        leave_type: 10,
        number_of_days_off: 4,
        start_day: '2023-01-01',
        end_day: '2023-01-04',
        description: Faker::Lorem.sentence
      }
    end

    describe '.call' do
      let!(:result) { subject.call }
      it { expect(result.first).to be false }
      it { expect(result.last).to eq('Leave application be invalid') }
    end
  end
end
