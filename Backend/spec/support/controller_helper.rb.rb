require 'rails_helper'
require 'jwt'
include JwtToken

module ControllerHelper
  def login email, password
    staff = Staff.find_by_email(email)

    if staff&.authenticate(password)
      payload = { staff_id: staff.id }
      token = jwt_encode(payload)
      return token
    else
      return false
    end
  end
end