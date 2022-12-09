# == Schema Information
#
# Table name: staff_contracts
#
#  id          :bigint           not null, primary key
#  title       :string
#  staff_id    :bigint
#  start_date  :date
#  end_date    :date
#  status      :integer
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require "test_helper"

class StaffContractTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
