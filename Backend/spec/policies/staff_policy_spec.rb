# frozen_string_literal: true

require	'rails_helper'

RSpec.describe StaffPolicy, type: :Policy do
  subject { described_class.new(user, user) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  context 'being a visitor' do
    it { is_expected.to forbid_action(:index) }
    it { is_expected.to forbid_action(:create) }
    it { is_expected.to forbid_action(:update) }
    it { is_expected.to forbid_action(:destroy) }
    it { is_expected.to forbid_action(:destroy_and_update_staff_boss) }
    it { is_expected.to forbid_action(:get_inactive_staff) }
    it { is_expected.to forbid_action(:recover_staff) }
    it { is_expected.to forbid_action(:permanent_destroy) }
  end

  context 'being an administrator' do
    before :each do
      user.add_role :Manager
    end
    it { is_expected.to permit_all_actions }
  end
end
