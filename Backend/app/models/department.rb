class Department < ApplicationRecord
  has_one :staff

  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 5 }
end