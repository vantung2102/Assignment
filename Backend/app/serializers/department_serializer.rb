# == Schema Information
#
# Table name: departments
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class DepartmentSerializer < BaseSerializer
  attributes  :id,
              :name,
              :description,
              :created_at,
              :updated_at
end
