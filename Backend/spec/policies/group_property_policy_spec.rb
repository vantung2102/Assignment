# frozen_string_literal: true

require	'rails_helper'

RSpec.describe GroupPropertyPolicy, type: :Policy do
  subject { described_class.new(user, group_property) }

  let(:group_property) { FactoryBot.create(:group_property) }
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
    it { is_expected.to forbid_all_actions }
  end

  context 'being an administrator' do
    before :each do
      user.add_role :Manager
    end
    it { is_expected.to permit_all_actions }
  end
end
