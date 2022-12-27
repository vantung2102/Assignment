class Paranoid < ActiveRecord::Base
  belongs_to :paranoiac

  # Paranoid objects will be recovered alongside Paranoic objects
  # if they were deleted within 10 minutes of the Paranoic object
  acts_as_paranoid dependent_recovery_window: 10.minutes
end