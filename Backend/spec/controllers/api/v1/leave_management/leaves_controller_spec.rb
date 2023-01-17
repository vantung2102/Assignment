# frozen_string_literal: true

require	'rails_helper'
include ControllerHelper

RSpec.describe Api::V1::LeaveManagement::LeavesController, type: :controller do
  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  let!(:leave) do
    Array.new(2) do
      FactoryBot.create(:leave,
                        staff_id: user.id)
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
    let!(:http) { :get }
    let!(:action) { :show }
    let!(:params) { { id: Leave.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'renders the show template' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        get :show, params: { id: Leave.first.id }
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
      before :each do
        user.add_role :Manager
      end

      it 'create incorrect' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :create, params: {
          leave: {
            staff_id: user.id
          }
        }, as: :json
        expect(response.status).to eq(422)
      end

      it 'create correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :create, params: {
          leave: {
            staff_id: user.id,
            casual_leave: 0,
            unpaid_leave: 0,
            marriage_leave: 0,
            compassionate_leave: 0,
            paternity_leave: 0,
            maternity_leave: 0,
            allowed_number_of_days_off: 12,
            description: Faker::Lorem.sentence
          }
        }, as: :json

        expect(response.status).to eq(201)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'destroy action' do
    let!(:http) { :delete }
    let!(:action) { :destroy }
    let!(:params) { { id: Leave.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end
      it 'destroy correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        delete :destroy, params: { id: Leave.first.id }
        expect(response.status).to eq(204)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'leave_by_user action' do
    let!(:http) { :post }
    let!(:action) { :leave_by_user }
    let!(:params) {}

    context 'Logged in' do
      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :leave_by_user, params: { staff_id: user.id }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end
end
