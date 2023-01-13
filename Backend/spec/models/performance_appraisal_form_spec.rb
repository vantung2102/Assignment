require 'rails_helper'

RSpec.describe PerformanceAppraisalForm, type: :model do
  it do
    should define_enum_for(:status).
    with_values(in_progress: 1, self_reviewed: 2, completed: 3).
    backed_by_column_of_type(:integer).with_suffix
  end

  it { should belong_to(:staff) }
  it { should belong_to(:boss).class_name('Staff').without_validating_presence }
  it { is_expected.to validate_presence_of(:status) }
  it { is_expected.to validate_presence_of(:start_date) }
  it { is_expected.to validate_presence_of(:end_date) }
end
