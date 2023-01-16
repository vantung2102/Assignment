require 'rails_helper'

RSpec.describe RequestProperty, type: :model do
  it do
    should define_enum_for(:status).
    with_values(pending:  0, approved: 1, cancelled: 2).
    backed_by_column_of_type(:integer)
  end
  it do
    should define_enum_for(:request_type).
    with_values(device:  0, account: 1).
    backed_by_column_of_type(:integer)
  end

  it { should belong_to(:requester).class_name(:Staff) }
  it { should belong_to(:approver).class_name(:Staff).without_validating_presence }
  it { should belong_to(:group_property).without_validating_presence }
  it { should have_many(:comments).dependent(:destroy) }
end
