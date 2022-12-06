Rails.application.routes.draw do
  namespace :api do
    namespace :auth do
      post 'login', to: 'authentication#log_in'
      post 'logout', to: 'authentication#log_out'
    end

    namespace :v1 do
      namespace :staff_management do
        resources :staffs do
          member do
            post 'lower_levels_staff_chart', to: "staffs#lower_levels_staff_chart"
          end
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
            post 'requests_by_user', to: "request_properties#requests_by_user"
          end
        end
      end

      namespace :leave_management do
        resources :leaves do
          collection do
            post 'leave_by_user', to: "leave#leave_by_user"
          end
        end
        resources :leave_applications do
          collection do
            post 'leave_application_by_user', to: "leave_applications#leave_application_by_user"
            post 'leave_application_by_status', to: "leave_applications#leave_application_by_status"
          end
          member do
            post 'respond_to_leave_application', to: "leave_applications#respond_to_leave_application"
          end
        end
      end

      resources :comments
    end
  end
end
