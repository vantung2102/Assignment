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
class JobTitle < ApplicationRecord
  has_many :staffs
  validates :title, presence: true
  validates :description, presence: true
end
