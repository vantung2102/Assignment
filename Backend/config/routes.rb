Rails.application.routes.draw do
  namespace :api do
    namespace :auth do
      post 'login', to: 'authentication#log_in'
      post 'logout', to: 'authentication#log_out'
    end

    namespace :v1 do
      namespace :staff_management do
        resources :staffs do
          collection do
            post 'chart', to: "staffs#staff_chart"
          end
        end
        resources :positions
        resources :departments
      end

      namespace :property_management do
        resources :properties
        resources :group_properties
        resources :property_providing_histories
      end
      
      namespace :request_management do
        resources :request_properties do
          member do
            post 'response_request', to: "request_properties#response_request"
          end
          collection do
            post 'get_request', to: "request_properties#get_request"
          end
        end
      end
      resources :comments
    end
  end
end
