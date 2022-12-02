# == Schema Information
#
# Table name: request_properties
#
#  id           :bigint           not null, primary key
#  request_type :integer
#  description  :string
#  reason       :string
#  status       :integer
#  requester_id :integer
#  approver_id  :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class RequestPropertySerializer < BaseSerializer
  attributes  :id,
              :status,
              :request_type,
              :reason,
              :description,
              :requester_id,
              :requester_id,
              :created_at,
              :updated_at

  attribute :comments
end
