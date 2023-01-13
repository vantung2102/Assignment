require 'rails_helper'

module ControllerHelper
  def login_admin_user(user)
    user.add_role :admin
    user.confirm
    sign_in(user)
  end

  def login_client_user(client)
    client.add_role :user
    client.confirm
    sign_in(client)
  end
end