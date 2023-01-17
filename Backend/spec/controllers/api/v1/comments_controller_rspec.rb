# frozen_string_literal: true

require	'rails_helper'
include ControllerHelper

RSpec.describe Api::V1::CommentsController, type: :controller do
  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  let!(:comment) do
    FactoryBot.create(:comment, staff_id: user.id)
  end

  describe 'create action' do
    let!(:http) { :post }
    let!(:action) { :create }
    let!(:params) {}

    context 'Logged in' do
      it 'create correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :create, params: {
          comment: {
            content: Faker::Lorem.paragraph,
            commentable_id: 100,
            commentable_type: 'RequestProperty'

          }
        }
        expect(response.status).to eq(201)
      end

      it 'create incorrect' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        post :create, params: {
          comment: {
            content: 'tung',
            commentable_id: 100,
            commentable_type: 'RequestProperty'

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
    let!(:params) { { id: Comment.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'destroy correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        delete :destroy, params: { id: Comment.first.id }
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
    let!(:params) { { id: Comment.first.id } }

    context 'Logged in' do
      before :each do
        user.add_role :Manager
      end

      it 'correct' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        put :update, params: { id: Comment.first.id,
                               comment: { content: Faker::Lorem.sentence } }
        expect(response.status).to eq(200)
      end

      it 'incorrect' do
        request.headers['Authorization'] = login(user.email, 'Levantung123@')
        put :update, params: { id: Comment.first.id,
                               comment: { content: 'tung' } }
        expect(response.status).to eq(422)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end
end
