# frozen_string_literal: true

require	'rails_helper'

RSpec.describe RequestPropertyPolicy, type: :Policy do
  subject { described_class.new(user, request_property) }

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

  context 'being a visitor' do
    it { is_expected.to forbid_action(:index) }
    it { is_expected.to forbid_action(:response_request) }
    it { is_expected.to forbid_action(:requests_by_status) }

    it { is_expected.to permit_action(:show) }
    it { is_expected.to permit_action(:create) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }
  end

  context 'being an administrator' do
    before :each do
      user.add_role :Manager
    end
    it { is_expected.to permit_all_actions }
  end
end
