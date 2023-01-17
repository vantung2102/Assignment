# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OnboardingStep, type: :model do
  it do
    should define_enum_for(:status)
      .with_values(outstanding: 0, completed: 1)
      .backed_by_column_of_type(:integer)
  end
  it { should belong_to(:onboarding_sample_step) }
  it { should belong_to(:staff_onboarding) }
  it { should belong_to(:assigned_person).class_name(:Staff).without_validating_presence }
end
