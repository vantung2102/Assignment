module Api
  module V1
    module Auth
      class TokensController < BaseController
        def refresh
          render_resource(current_user, view: :auth)
        end
      end
    end
  end
end
