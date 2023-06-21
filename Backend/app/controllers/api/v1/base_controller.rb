class Api::V1::BaseController < ApplicationController
  before_action :authenticate_user!
  
  attr_reader :current_user

  def page_number
    params.dig(:page, :number) || 1
  end

  def page_size
    params.dig(:page, :size) || Pagy::DEFAULT[:items]
  end

  private

  def authenticate_user!
    header, token = request.headers['Authorization']&.split(' ')
    @current_user = Auth::ValidateUserFromTokenService.call(header, token)
  end

  def filter_params
    params[:filter]&.permit! || {}
  end

  def order_params
    params[:order]&.permit! || {}
  end
end
