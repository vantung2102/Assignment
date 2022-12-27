class Paranoiac < ActiveRecord::Base
  acts_as_paranoid
  has_many :paranoids, dependent: :destroy
end