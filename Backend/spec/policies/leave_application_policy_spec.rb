# frozen_string_literal: true

require	'rails_helper'

RSpec.describe LeaveApplicationPolicy, type: :Policy do
  subject { described_class.new(user, leave_application) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let(:leave) { FactoryBot.create(:leave, staff_id: current_user.id) }
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

  context 'leave application of user' do
    it { is_expected.to permit_action(:show) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }

    it { is_expected.to forbid_action(:index) }
    it { is_expected.to forbid_action(:respond_to_leave_application) }

    describe 'leave_application_by_user' do
      let(:leave_application) { LeaveApplication.where(staff_id: user.id) }
      it { is_expected.to permit_action(:leave_application_by_user) }
    end
  end

  context 'being an administrator' do
    before :each do
      user.add_role :Manager
    end

    it { is_expected.to permit_all_actions }
  end
end
