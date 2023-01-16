# frozen_string_literal: true

require	'rails_helper'
include ControllerHelper

RSpec.describe Api::V1::LeaveManagement::LeaveApplicationsController, type: :controller do
  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  let!(:leave_applications) do
    Array.new(2) do
      FactoryBot.create(:leave_application,
                        number_of_days_off: 1, staff_id: user.id)
    end
  end

  describe 'Index action' do
    let!(:http) { 'get' }
    let!(:action) { :index }
    let!(:params) {}

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'Get index success' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        get :index
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'Show action' do
    let!(:http) { 'get' }
    let!(:action) { :show }
    let!(:params) { { id: LeaveApplication.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'renders the show template' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        get :show, params: { id: LeaveApplication.first.id }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'create action' do
    let!(:http) { :post }
    let!(:action) { :create }
    let!(:params) {}

    context 'Logged in' do
      it 'create correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :create, params: {
          leave_application: {
            leave_type: 0,
            number_of_days_off: 2,
            start_day: '2023-01-14',
            end_day: '2023-01-15',
            description: Faker::Lorem.paragraph
          }
        }, as: :json
        expect(response.status).to eq(201)
      end

      it 'create incorrect The number of days exceeds the allowed limit' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :create, params: {
          leave_application: {
            leave_type: 0,
            number_of_days_off: 20,
            start_day: '2023-01-14',
            end_day: '2023-01-15',
            description: Faker::Lorem.paragraph
          }
        }, as: :json

        expect(response.status).to eq(422)
        expect(JSON.parse(response.body)['errors'].first['detail']).to eq('The number of days exceeds the allowed limit')
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'destroy action' do
    let!(:http) { :delete }
    let!(:action) { :destroy }
    let!(:params) { { id: LeaveApplication.first.id } }

    context 'Logged in' do
      it 'destroy correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        delete :destroy, params: { id: LeaveApplication.first.id }
        expect(response.status).to eq(204)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'leave_application_by_user action' do
    let!(:http) { :post }
    let!(:action) { :leave_application_by_user }
    let!(:params) {}

    context 'Logged in' do
      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :leave_application_by_user, params: { staff_id: user.id }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'respond_to_leave_application action' do
    let!(:http) { :post }
    let!(:action) { :respond_to_leave_application }
    let!(:params) { { id: LeaveApplication.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :respond_to_leave_application, params: { id: LeaveApplication.first.id,
                                                      leave_application: { status: :approved } }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'leave_application_by_status action' do
    let!(:http) { :post }
    let!(:action) { :leave_application_by_status }
    let!(:params) {}

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :leave_application_by_status, params: { status: :approved }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'update action' do
    let!(:http) { :put }
    let!(:action) { :update }
    let!(:params) { { id: LeaveApplication.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        put :update, params: { id: LeaveApplication.first.id,
                               leave_application: { description: Faker::Lorem.sentence } }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end
end
