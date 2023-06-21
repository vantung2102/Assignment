module API
  module V1
    module Auth
      class PasswordsController < BaseController
        skip_before_action :authenticate_user!

        def forgot_password
          user = User.find_by!(email: email)
          user.generate_password_token!
          AccountMailer.with(user: user).forgot_email.deliver_now
          head :no_content
        end

        def reset_password
          user = User.find_by!(reset_password_token: reset_params[:verification_token])
          if user.password_token_expired?
            render_api_error(NotAuthenticationError.new('Code is not valid or expired'))
          else
            user.reset_password!(reset_params[:new_password])
            render_resource(user)
          end
        end

        private

        def email
          params.require(:email)
        end

        def reset_params
          params.require(:reset).permit(:verification_token, :new_password)
        end
      end
    end
  end
end
