require 'rails_helper'

RSpec.describe OnboardingStepSerializer, type: :serializer do
  subject { described_class.new(onboarding_step) }

  let(:department) { FactoryBot.create(:department) }
  let!(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end

  let(:onboarding_sample_step) { FactoryBot.create(:onboarding_sample_step, position_id: position.id) }
  let(:staff_onboarding) do
    FactoryBot.create(:staff_onboarding,
                      position_id: position.id, staff_id: user.id)
  end

  let(:onboarding_step) do
    FactoryBot.create(:onboarding_step,
                      assigned_person_id: user.id,
                      onboarding_sample_step_id: onboarding_sample_step.id,
                      staff_onboarding_id: staff_onboarding.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:onboarding_sample_step) }
  it { is_expected.to serialize_attribute(:staff_onboarding) }
  it { is_expected.to serialize_attribute(:assigned_person) }
  it { is_expected.to serialize_attribute(:status) }
  it { is_expected.to serialize_attribute(:start_date) }
  it { is_expected.to serialize_attribute(:due_date) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end