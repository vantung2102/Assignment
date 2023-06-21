Rails.application.routes.draw do
  root 'supports#home'

  namespace :api do
    namespace :auth do
      post 'login', to: 'authentication#log_in'
      post 'logout', to: 'authentication#log_out'
      get 'get_current_user', to: 'authentication#get_current_user'
    end

    namespace :v1 do
      namespace :auth do
        post :signup, to: 'registrations#create'
        post :verify, to: 'registrations#verify'

        post :login, to: 'sessions#create'

        get 'token/refresh', to: 'tokens#refresh'

        resources :profiles, only: %i[show update destroy]
        get :me, to: 'profiles#me'

        post :forgot_password, to: 'passwords#forgot_password'
        post :reset_password, to: 'passwords#reset_password'
      end

      namespace :staff_management do
        resources :staffs do
          member do
            post 'destroy_and_update_staff_boss', to: "staffs#destroy_and_update_staff_boss"
            get 'recover_staff', to: "staffs#recover_staff"
            get 'permanent_destroy', to: "staffs#permanent_destroy"
          end
          collection do
            get 'get_inactive_staff', to: "staffs#get_inactive_staff"
            get 'get_all_staff', to: "staffs#get_all_staff"
          end
        end

        resources :positions do
          collection do
            get 'get_all_position', to: "positions#get_all_position"
          end
        end

        resources :departments do
          collection do
            get 'get_all_department', to: "departments#get_all_department"
          end
        end

        resources :job_titles do
          collection do
            get 'get_all_job_title', to: "job_titles#get_all_job_title"
          end
        end

        resources :staff_contracts
      end

      namespace :property_management do
        resources :properties do
          member do
            put 'response_property_request', to: 'properties#response_property_request'
          end
        end
        resources :group_properties
        resources :property_providing_histories do
          collection do
            post 'histories_by_property', to: "property_providing_histories#histories_by_property"
          end
        end
      end
      
      namespace :request_management do
        resources :request_properties do
          member do
            post 'response_request', to: "request_properties#response_request"
          end
          collection do
            post 'requests_by_user', to: "request_properties#requests_by_user"
            post 'requests_by_status', to: "request_properties#requests_by_status"
          end
        end
      end

      namespace :leave_management do
        resources :leaves do
          collection do
            post 'leave_by_user', to: "leaves#leave_by_user"
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

      namespace :onboarding_management do
        resources :onboarding_steps do
          collection do
            post 'onboarding_steps_by_staff_onboarding', to: 'onboarding_steps#onboarding_steps_by_staff_onboarding'
          end
          member do
            get 'complete_onboarding_step', to: 'onboarding_steps#complete_onboarding_step'
          end
        end
        resources :staff_onboardings do

          collection do
            post 'staff_onboarding_by_user', to: 'staff_onboardings#staff_onboarding_by_user'
          end
        end

        resources :onboarding_sample_steps do
          collection do
            post 'onboarding_sample_steps_by_position', to: 'onboarding_sample_steps#onboarding_sample_steps_by_position'
          end
        end
      end

      namespace :performance_management do
        resources :performance_appraisal_forms do
          member do
            get 'remind_by_staff', to: 'performance_appraisal_forms#remind_by_staff'
          end
          collection do
            get 'show_self_review', to: 'performance_appraisal_forms#show_self_review'
            post 'create_all_fa_forms_for_staff', to: 'performance_appraisal_forms#create_all_fa_forms_for_staff'
            post 'update_all_active_or_inactive', to: 'performance_appraisal_forms#update_all_active_or_inactive'
            get 'pa_forms_by_current_user', to: 'performance_appraisal_forms#pa_forms_by_current_user'
            get 'pa_forms_by_my_reviewed', to: 'performance_appraisal_forms#pa_forms_by_my_reviewed'
            post 'remind_all_staff', to: 'performance_appraisal_forms#remind_all_staff'
          end
        end
      end

      resources :comments
    end
  end
end
