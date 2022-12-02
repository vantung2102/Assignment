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
class Comment < ApplicationRecord
  belongs_to :commentable , :polymorphic => true
end
