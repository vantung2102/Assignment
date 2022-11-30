class Position < ApplicationRecord
  has_one :staff

  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 5 }
  validates :department_id, presence: true
end