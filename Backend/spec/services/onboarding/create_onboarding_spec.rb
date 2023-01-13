require 'rails_helper'

RSpec.describe Onboarding::CreateOnboardingService, type: :service do
  subject { described_class.new(staff) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:staff) { FactoryBot.create(:staff,
    department_id: department.id,
    position_id: position.id,
    job_title_id: job_title.id) 
  }

  # context "leave created success" do
  #   describe '.call' do
  #     let!(:result) { subject.call }
  #     it { expect(result.first).to be true }
  #   end
  # end

  context "Create onboarding faild" do
    describe '.call' do
      let!(:result) { subject.call }
      it { expect(result.first).to be false }
      it { expect(result.last).to eq I18n.t('error_codes.E210') }
    end
  end
end