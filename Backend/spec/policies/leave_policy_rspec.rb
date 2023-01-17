# frozen_string_literal: true

require	'rails_helper'

RSpec.describe LeavePolicy, type: :Policy do
  subject { described_class.new(user, leave) }

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

  let!(:leave) { FactoryBot.create(:leave, staff_id: user.id) }

  context 'leave of user' do
    describe 'leave_by_user' do
      it { is_expected.to permit_action(:leave_by_user) }
    end
  end

  context 'being an administrator' do
    before :each do
      user.add_role :Manager
    end

    it { is_expected.to permit_all_actions }
  end
end
