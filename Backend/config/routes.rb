Rails.application.routes.draw do
  namespace :api do
    namespace :auth do
      post 'login', to: 'authentication#log_in'
      post 'logout', to: 'authentication#log_out'
    end

    namespace :v1 do
      resources :staffs
      resources :departments
      resources :positions
      resources :users

      post 'staffs/chart', to: "staffs#company_chart"
    end
  end
end
