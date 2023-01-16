# frozen_string_literal: true

require	'rails_helper'

RSpec.describe OnboardingSampleStepPolicy, type: :Policy do
  subject { described_class.new(user, onboarding_sample_step) }

  let(:department) { FactoryBot.create(:department) }
  let!(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let(:leave) { FactoryBot.create(:leave, staff_id: current_user.id) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  let!(:onboarding_sample_step) do
    FactoryBot.create(:onboarding_sample_step, position_id: position.id)
  end

  context 'onboarding_sample_step of user' do
    it { is_expected.to forbid_all_actions }
  end

  context 'being an administrator' do
    before :each do
      user.add_role :Manager
    end

    it { is_expected.to permit_all_actions }
  end
end
