require 'rails_helper'

RSpec.describe PerformanceAppraisalFormSerializer, type: :serializer do
  subject { described_class.new(performance_appraisal_form) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end
  let(:user2) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id,
                      email: Faker::Internet.email)
  end
  let(:performance_appraisal_form) do
    FactoryBot.create(:performance_appraisal_form,
                      staff_id: user.id,
                      boss_id: user2.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:status) }
  it { is_expected.to serialize_attribute(:active) }
  it { is_expected.to serialize_attribute(:goals_set_staff) }
  it { is_expected.to serialize_attribute(:goals_set_boss) }
  it { is_expected.to serialize_attribute(:achievement_staff) }
  it { is_expected.to serialize_attribute(:achievement_boss) }
  it { is_expected.to serialize_attribute(:goals_with_company_staff) }
  it { is_expected.to serialize_attribute(:goals_with_company_boss) }  
  it { is_expected.to serialize_attribute(:challenging_staff) }
  it { is_expected.to serialize_attribute(:challenging_boss) }
  it { is_expected.to serialize_attribute(:least_enjoy_staff) }
  it { is_expected.to serialize_attribute(:least_enjoy_boss) }
  it { is_expected.to serialize_attribute(:contribute_staff) }
  it { is_expected.to serialize_attribute(:contribute_boss) }
  it { is_expected.to serialize_attribute(:current_job_staff) }
  it { is_expected.to serialize_attribute(:current_job_boss) }
  it { is_expected.to serialize_attribute(:improvement_staff) }
  it { is_expected.to serialize_attribute(:improvement_boss) }
  it { is_expected.to serialize_attribute(:obstructing_staff) }
  it { is_expected.to serialize_attribute(:obstructing_boss) }
  it { is_expected.to serialize_attribute(:feedback_staff) }
  it { is_expected.to serialize_attribute(:feedback_boss) }
  it { is_expected.to serialize_attribute(:description_staff) }
  it { is_expected.to serialize_attribute(:description_boss) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }
  it { is_expected.to serialize_attribute(:start_date) }
  it { is_expected.to serialize_attribute(:end_date) }
  it { is_expected.to serialize_attribute(:staff) }
  it { is_expected.to serialize_attribute(:boss) }
end