require 'rails_helper'

RSpec.describe Role, type: :model do
  it { should have_and_belong_to_many(:staffs).join_table(:staffs_roles) }
  it do
    should validate_inclusion_of(:resource_type).
    in_array( Rolify.resource_types).allow_nil
  end
  it { is_expected.to belong_to(:resource).without_validating_presence }
end
