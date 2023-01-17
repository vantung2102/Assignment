require	'rails_helper'
include ControllerHelper

RSpec.describe Api::Auth::AuthenticationController, type: :controller do
  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) { FactoryBot.create(:staff,
    department_id: department.id,
    position_id: position.id,
    job_title_id: job_title.id) 
  }

  describe "Login" do
    let!(:http) { :post }
    let!(:action) { :log_in }
    let!(:params) { }

    context "Logged in" do      
      it "Login Success" do
        post :log_in, params: { email: user.email, password: 'Levantung123@' }
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)['staff']).to eq(user.id)
      end
    end
    
    context "not logged in" do
      it_behaves_like "authenticate"
    end
  end

end