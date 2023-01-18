# frozen_string_literal: true

require	'rails_helper'
include ControllerHelper

RSpec.describe Api::V1::StaffManagement::PositionsController, type: :controller do
  let(:department) { FactoryBot.create(:department) }
  let!(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  describe 'Index action' do
    let!(:http) { :get }
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

  describe 'Get all position action' do
    let!(:http) { :get }
    let!(:action) { :get_all_position }
    let!(:params) {}

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'Get index success' do
        get :get_all_position
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
    let!(:params) { { id: Position.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'renders the show template' do
        get :show, params: { id: Position.first.id }
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

      it 'create correct' do
        post :create, params: {
          position: {
            name: Faker::Name.name,
            description: Faker::Lorem.paragraph
          }
        }
        expect(response.status).to eq(201)
      end

      it 'create incorrect' do
        post :create, params: {
          position: {
            description: Faker::Lorem.paragraph
          }
        }
        expect(response.status).to eq(422)
        expect(JSON.parse(response.body)['errors'].first['title']).to eq('Unprocessable Entity')
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'destroy action' do
    let!(:http) { :delete }
    let!(:action) { :destroy }
    let!(:params) { { id: Position.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'destroy correct' do
        delete :destroy, params: { id: Position.first.id }
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
    let!(:params) { { id: Position.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
        login(user.email, 'Levantung123@')
      end

      it 'correct' do
        put :update, params: { id: Position.first.id,
                               position: { description: Faker::Lorem.sentence } }
        expect(response.status).to eq(200)
      end

      it 'incorrect' do
        put :update, params: { id: Position.first.id,
                               position: { description: 'tung' } }
        expect(response.status).to eq(422)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end
end
