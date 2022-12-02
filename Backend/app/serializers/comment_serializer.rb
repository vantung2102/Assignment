# == Schema Information
#
# Table name: comments
#
#  id               :bigint           not null, primary key
#  staff_id         :bigint
#  commentable_type :string
#  commentable_id   :bigint
#  content          :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class CommentSerializer < BaseSerializer
  attributes  :id,
              :staff_id,
              :content,
              :commentable_type,
              :commentable_id,
              :created_at,
              :updated_at
end
