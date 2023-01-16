# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Onboarding::CreateOnboardingService, type: :service do
  subject { described_class.new(staff) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:staff) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  context 'not onboarding for position' do
    describe '.call' do
      let!(:result) { subject.call }
      it { expect(result.first).to be true }
    end
  end

  context 'leave created success' do
    before :each do
      Array.new(5) do
        FactoryBot.create(:onboarding_sample_step, position_id: position.id)
      end
    end

    describe '.call' do
      let!(:result) { subject.call }
      it { expect(result.first).to be true }
    end
  end
end
