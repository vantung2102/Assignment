require 'rails_helper'

RSpec.describe CommentSerializer, type: :serializer do
  subject { described_class.new(comment) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let(:user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end
  let(:comment) do
    FactoryBot.create(:comment, staff_id: user.id)
  end

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:staff_id) }
  it { is_expected.to serialize_attribute(:content) }
  it { is_expected.to serialize_attribute(:commentable_type) }
  it { is_expected.to serialize_attribute(:commentable_id) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end