require 'rails_helper'

RSpec.describe StaffOnboardingSerializer, type: :serializer do
  subject { described_class.new(staff_onboarding) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end
  let(:staff_onboarding) { FactoryBot.create(:staff_onboarding, staff_id: user.id, position_id: position.id) }

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:active) }
  it { is_expected.to serialize_attribute(:position) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end