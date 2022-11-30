class ApplicationController < ActionController::API
  include Pagy::Backend
  include JwtToken
  include JsonApiRender

  before_action :authenticate_user

  def page_number
    params.dig(:page, :number) || 1
  end

  def page_size
    params.dig(:page, :size) || Pagy::DEFAULT[:items]
  end

  private

  def authenticate_user
    header = request.headers['Authorization']
    header = header.split(' ').last if header

    begin
      @decoded = jwt_decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
