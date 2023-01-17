# frozen_string_literal: true

require	'rails_helper'

RSpec.describe PerformanceAppraisalFormPolicy, type: :Policy do
  subject { described_class.new(user, performance_appraisal_form) }

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
  let!(:user2) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id,
                      email: Faker::Internet.email)
  end

  let(:performance_appraisal_form) do
    FactoryBot.create(:performance_appraisal_form,
                      staff_id: user.id,
                      boss_id: user2.id)
  end

  context 'onboarding_step of user' do
  end

  context 'performance_appraisal_form of user' do
    it { is_expected.to permit_action(:show) }
    it { is_expected.to permit_action(:show_self_review) }
    it { is_expected.to permit_action(:update) }

    it { is_expected.to forbid_action(:index) }
    it { is_expected.to forbid_action(:create) }
    it { is_expected.to forbid_action(:create_all_fa_forms_for_staff) }
    it { is_expected.to forbid_action(:destroy) }
    it { is_expected.to forbid_action(:update_pa_form_activation_status) }
    it { is_expected.to forbid_action(:update_all_active_or_inactive) }
    it { is_expected.to forbid_action(:remind_by_staff) }

    describe 'pa_forms_by_current_user and pa_forms_by_my_reviewed' do
      let(:performance_appraisal_form) { PerformanceAppraisalForm.where(staff_id: user.id) }

      it { is_expected.to permit_action(:pa_forms_by_current_user) }
      it { is_expected.to permit_action(:pa_forms_by_my_reviewed) }
    end
  end

  context 'being an administrator' do
    before :each do
      user.add_role :Manager
    end
    it { is_expected.to permit_all_actions }
  end
end
