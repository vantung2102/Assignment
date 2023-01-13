# == Schema Information
#
# Table name: request_properties
#
#  id                :bigint           not null, primary key
#  request_type      :integer
#  description       :string
#  reason            :string
#  status            :integer
#  requester_id      :integer
#  approver_id       :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  group_property_id :bigint
#
require "test_helper"

class RequestPropertyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
