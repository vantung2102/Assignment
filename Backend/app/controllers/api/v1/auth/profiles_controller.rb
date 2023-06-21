module API
  module V1
    module Auth
      class ProfilesController < BaseController
        def me
          render_resource(current_user)
        end

        def show
          user = User.find(params[:id])
          authorize(user)
          render_resource(user)
        end

        def update
          current_user.update!(user_params)
          render_resource(current_user)
        end

        def destroy
          current_user.destroy!
          head :no_content
        end

        private

        def user_params
          params.require(:user).permit(
            :name,
            :gender,
            :dob,
            :nationality_code,
            :phone_code,
            :phone_number,
            images: []
          )
        end
      end
    end
  end
end
