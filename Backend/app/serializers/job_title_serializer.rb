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
class JobTitleSerializer < BaseSerializer
  attributes  :id, :title, :description, :created_at, :updated_at
end
