# frozen_string_literal: true

require	'rails_helper'
include ControllerHelper

RSpec.describe Api::V1::StaffManagement::StaffsController, type: :controller do
  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
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
                      email: 'vantung@gmail.com')
  end

  let!(:user4) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id,
                      email: 'vantung123456@gmail.com')
  end

  describe 'Index action' do
    let!(:http) { :get }
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

  describe 'Get all staff action' do
    let!(:http) { :get }
    let!(:action) { :get_all_staff }
    let!(:params) {}

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'Get index success' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        get :get_all_staff
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
    let!(:params) { { id: Staff.first.id } }

    context 'Logged in' do
      it 'renders the show template' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        get :show, params: { id: Staff.first.id }
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

      it 'create correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :create, params: {
          staff: {
            fullname: Faker::Name.name,
            date_of_birth: '2001-02-21',
            gender: 'men',
            status: :active,
            phone: '0984235062',
            email: Faker::Internet.email,
            password: 'Levantung123@',
            address: Faker::Address.full_address,
            position_id: position.id,
            department_id: department.id,
            staff_id: nil,
            job_title_id: job_title.id
          }
        }
        expect(response.status).to eq(201)
      end

      it 'create incorrect' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :create, params: {
          staff: {
            fullname: Faker::Name.name,
            date_of_birth: '2001-02-21',
            gender: 'men',
            status: :active,
            phone: '0984235062'
          }
        }
        expect(response.status).to eq(422)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'destroy action' do
    let!(:http) { :delete }
    let!(:action) { :destroy }
    let!(:params) { { id: Staff.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'destroy correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        delete :destroy, params: { id: Staff.first.id }
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
    let!(:params) { { id: Staff.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        put :update, params: { id: Staff.first.id,
                               staff: { email: Faker::Internet.email } }
        expect(response.status).to eq(200)
      end

      it 'incorrect' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        put :update, params: { id: Staff.first.id,
                               staff: { position_id: 100 } }
        expect(response.status).to eq(422)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'destroy_and_update_staff_boss action' do
    let!(:http) { :post }
    let!(:action) { :destroy_and_update_staff_boss }
    let!(:params) {}

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      let(:user3) do
        FactoryBot.create(:staff,
                          department_id: department.id,
                          position_id: position.id,
                          job_title_id: job_title.id,
                          email: 'vantung123@gmail.com',
                          staff_id: 2)
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :destroy_and_update_staff_boss, params: { id: user2.id,
                                                       boss_id: user.id }
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'get_inactive_staff action' do
    let!(:http) { :post }
    let!(:action) { :get_inactive_staff }
    let!(:params) {}

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :get_inactive_staff
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'recover_staff action' do
    let!(:http) { :post }
    let!(:action) { :recover_staff }
    let!(:params) { { id: user4.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        user4.destroy
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :recover_staff, params: { id: user4.id }
        expect(response.status).to eq(200)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'permanent_destroy action' do
    let!(:http) { :post }
    let!(:action) { :permanent_destroy }
    let!(:params) { { id: 4 } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        user4.destroy
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :permanent_destroy, params: { id: user4.id }
        expect(response.status).to eq(204)
      end
    end
  end
end
