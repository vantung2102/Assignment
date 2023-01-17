# frozen_string_literal: true

require 'rails_helper'

RSpec.describe LeaveApplication, type: :model do
  it do
    should define_enum_for(:leave_type)
      .with_values(
        casual_leave: 0,
        unpaid_leave: 1,
        marriage_leave: 2,
        compassionate_leave: 3,
        paternity_leave: 4,
        maternity_leave: 5
      ).backed_by_column_of_type(:integer).with_suffix
  end

  it do
    should define_enum_for(:status)
      .with_values(pending: 0, approved: 1, cancelled: 2)
      .backed_by_column_of_type(:integer).with_suffix
  end

  it { should belong_to(:staff).class_name(:Staff) }
  it { should belong_to(:approver).class_name(:Staff).without_validating_presence }
  it { is_expected.to validate_presence_of(:leave_type) }
  it { is_expected.to validate_presence_of(:start_day) }
  it { is_expected.to validate_presence_of(:end_day) }
  it { is_expected.to validate_presence_of(:staff_id) }
  it { is_expected.to validate_presence_of(:description) }
  it { is_expected.to validate_length_of(:description).is_at_most(5000).is_at_least(6) }
end
