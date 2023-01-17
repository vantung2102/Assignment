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
class RequestProperty < ApplicationRecord
  enum status: { pending:  0, approved: 1, cancelled: 2 }
  enum request_type: { device:  0, account: 1 }

  belongs_to :requester, class_name: :Staff
  belongs_to :approver, class_name: :Staff, optional: true
  belongs_to :group_property, optional: true
  has_many :comments, as: :commentable, dependent: :destroy

  validates :request_type, presence: true
  validates :reason, presence: true
  validates :description, presence: true
  validates :status, presence: true
  validates :status, presence: true
end
