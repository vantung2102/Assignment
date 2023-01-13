require 'rails_helper'

RSpec.describe Leave, type: :model do
  it { should belong_to(:staff) }
  it { should validate_numericality_of(:casual_leave).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:unpaid_leave).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:marriage_leave).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:compassionate_leave).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:paternity_leave).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:maternity_leave).is_greater_than_or_equal_to(0) }
  it { should validate_numericality_of(:allowed_number_of_days_off).is_greater_than_or_equal_to(0) }
end
