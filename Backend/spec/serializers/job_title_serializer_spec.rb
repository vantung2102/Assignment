require 'rails_helper'

RSpec.describe JobTitleSerializer, type: :serializer do
  subject { described_class.new(job_title) }

  let(:job_title) { FactoryBot.create(:job_title) }

  it { is_expected.to serialize_attribute(:id) }
  it { is_expected.to serialize_attribute(:title) }
  it { is_expected.to serialize_attribute(:description) }
  it { is_expected.to serialize_attribute(:created_at) }
  it { is_expected.to serialize_attribute(:updated_at) }  
end