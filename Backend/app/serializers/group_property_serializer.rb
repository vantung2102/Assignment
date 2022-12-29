# == Schema Information
#
# Table name: group_properties
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class GroupPropertySerializer < BaseSerializer
  attributes  :id,
              :name,
              :description,
              :created_at,
              :updated_at
end
