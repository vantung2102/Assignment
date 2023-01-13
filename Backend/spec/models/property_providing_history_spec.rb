require 'rails_helper'

RSpec.describe PropertyProvidingHistory, type: :model do
  it do
    should define_enum_for(:status).
    with_values(provided: 0, recall: 1).
    backed_by_column_of_type(:integer)
  end
  it { should belong_to(:provider).class_name('Staff') }
  it { should belong_to(:receiver).class_name('Staff') }  
  it { should belong_to(:property) }
  it { is_expected.to validate_presence_of(:provider_id) }
  it { is_expected.to validate_presence_of(:receiver_id) }  
  it { is_expected.to validate_presence_of(:property_id) }  
end
