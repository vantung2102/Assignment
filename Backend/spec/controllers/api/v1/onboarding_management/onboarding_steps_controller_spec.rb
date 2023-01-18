# frozen_string_literal: true

require	'rails_helper'
include ControllerHelper

RSpec.describe Api::V1::OnboardingManagement::OnboardingStepsController, type: :controller do
  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end
  let(:onboarding_sample_step) { FactoryBot.create(:onboarding_sample_step, position_id: position.id) }
  let!(:staff_onboarding) do
    FactoryBot.create(:staff_onboarding,
                      staff_id: user.id,
                      position_id: position.id)
  end
  let!(:onboarding_step) do
    FactoryBot.create(:onboarding_step,
                      assigned_person_id: user.id,
                      onboarding_sample_step_id: onboarding_sample_step.id,
                      staff_onboarding_id: staff_onboarding.id)
  end

  let!(:onboarding_step2) do
    FactoryBot.create(:onboarding_step,
                      onboarding_sample_step_id: onboarding_sample_step.id,
                      staff_onboarding_id: staff_onboarding.id)
  end

  describe 'Show action' do
    let!(:http) { :get }
    let!(:action) { :show }
    let!(:params) { { id: OnboardingStep.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'renders the show template' do
        get :show, params: { id: OnboardingStep.first.id }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'destroy action' do
    let!(:http) { :delete }
    let!(:action) { :destroy }
    let!(:params) { { id: OnboardingStep.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'destroy correct' do
        delete :destroy, params: { id: OnboardingStep.first.id }
        expect(response.status).to eq(204)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'update action' do
    let!(:http) { :put }
    let!(:action) { :update }
    let!(:params) { { id: OnboardingStep.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'correct' do
        put :update, params: { id: OnboardingStep.first.id,
                               onboarding_step: { status: :completed } }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'onboarding_steps_by_staff_onboarding action' do
    let!(:http) { :post }
    let!(:action) { :onboarding_steps_by_staff_onboarding }
    let!(:params) {}

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'correct' do
        post :onboarding_steps_by_staff_onboarding, params: { staff_id: user.id }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'complete_onboarding_step action' do
    let!(:http) { :get }
    let!(:action) { :complete_onboarding_step }
    let!(:params) { { id: OnboardingStep.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'correct' do
        get :complete_onboarding_step, params: { id: OnboardingStep.first.id }
        expect(response.status).to eq(200)
      end

      it 'Incorrect' do
        get :complete_onboarding_step, params: { id: OnboardingStep.last.id }
        expect(response.status).to eq(422)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end
end
