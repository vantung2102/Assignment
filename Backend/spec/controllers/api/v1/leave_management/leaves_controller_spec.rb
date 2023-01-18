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
        login(user.email, 'Levantung123@')
      end

      it 'Get index success' do
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
        login(user.email, 'Levantung123@')
      end

      it 'renders the show template' do
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
        login(user.email, 'Levantung123@')
      end

      it 'create incorrect' do
        post :create, params: {
          leave: {
            staff_id: user.id
          }
        }, as: :json
        expect(response.status).to eq(422)
      end

      it 'create correct' do
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
        login(user.email, 'Levantung123@')
      end
      it 'destroy correct' do
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
      before :each do
        login(user.email, 'Levantung123@')
      end

      it 'correct' do
        post :leave_by_user, params: { staff_id: user.id }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end
end
