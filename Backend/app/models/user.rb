class User < ApplicationRecord
  enum roles: { CEO: CEO, HR: HR, MANAGER: MANAGER, STAFF: STAFF }
  rolify
  has_secure_password

  validates :full_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end