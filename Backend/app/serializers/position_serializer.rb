# == Schema Information
#
# Table name: positions
#
#  id            :bigint           not null, primary key
#  name          :string
#  department_id :bigint
#  description   :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class PositionSerializer < BaseSerializer
  attributes :id, :name, :description, :created_at, :updated_at
end
