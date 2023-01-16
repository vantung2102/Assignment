# frozen_string_literal: true

require	'rails_helper'

RSpec.describe PropertyProvidingHistoryPolicy, type: :Policy do
  subject { described_class.new(user, property_providing_history) }

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
  let(:property_providing_history) do
    FactoryBot.create(:property_providing_history,
                      provider_id: user.id,
                      receiver_id: user.id,
                      property_id: property.id)
  end

  context 'being a visitor' do
    it { is_expected.to forbid_all_actions }
  end

  context 'being an administrator' do
    before :each do
      user.add_role :Manager
    end
    it { is_expected.to permit_action(:index) }
    it { is_expected.to permit_action(:show) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }
    it { is_expected.to permit_action(:property_recall) }
    it { is_expected.to permit_action(:histories_by_property) }
  end
end
