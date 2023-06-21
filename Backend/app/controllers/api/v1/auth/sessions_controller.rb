module Api
  module V1
    module Auth
      class SessionsController < BaseController
        skip_before_action :authenticate_user!, only: :create

        def create
          strategy = {
            local: Auth::Local.new
          }[user_params[:provider]&.to_sym]

          unless strategy
            render_api_error(ApiErrors::BadRequestError.new('Provider is invalid'))
            return
          end

          user = Auth::LoginUserService.call(user_params, strategy)
          render_resource(user, view: :auth)
        end

        private

        def user_params
          params.require(:user).permit(:email, :password)
        end
      end
    end
  end
end
