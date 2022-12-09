# == Schema Information
#
# Table name: job_titles
#
#  id          :bigint           not null, primary key
#  title       :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require "test_helper"

class JobTitleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
