class SupportsController < ApplicationController
  def home
    render json: { app: 'Zane-Office-HRM', version: '0.0.1' }
  end
end
