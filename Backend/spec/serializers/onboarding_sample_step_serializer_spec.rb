require 'rails_helper'

RSpec.describe OnboardingSampleStepSerializer, type: :serializer do
  subject { described_class.new(onboarding_sample_step) }

  let(:position) { FactoryBot.create(:position) }
  let(:onboarding_sample_step) do
    FactoryBot.create(:onboarding_sample_step, position_id: position.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:position) }
  it { is_expected.to serialize_attribute(:task) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end