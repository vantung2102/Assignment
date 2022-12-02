class ApplicationController < ActionController::API
  include Pagy::Backend
  include Pundit::Authorization
  include JwtToken
  include JsonApiRender

  before_action :authenticate_user
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

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
      @current_user = Staff.find(@decoded[:staff_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end

  def current_user
    @current_user || nil
  end

  def user_not_authorized
    render json: { errors: 'You are not authorized to perform this action.' }, status: :unauthorized
  end
end
