require 'rails_helper'

RSpec.describe Property, type: :model do
  it do
    should define_enum_for(:status).
    with_values(available: 0, used: 1).
    backed_by_column_of_type(:integer).with_suffix
  end

  it { should belong_to(:group_property) }
  it { is_expected.to validate_presence_of(:code_seri) }
  it { is_expected.to validate_presence_of(:status) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:brand) }
  it { is_expected.to validate_presence_of(:group_property_id) }
  it { is_expected.to validate_presence_of(:price) }
  it { is_expected.to validate_presence_of(:date_buy) }
  it { is_expected.to validate_presence_of(:number_of_repairs) }

  it { is_expected.to validate_numericality_of(:price).is_greater_than_or_equal_to(0) }
  it { is_expected.to validate_numericality_of(:number_of_repairs).is_greater_than_or_equal_to(0) }
end
