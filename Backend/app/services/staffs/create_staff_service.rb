class Staffs::CreateStaffService < ApplicationService
  def initialize(staff_params)
    @staff_params = staff_params
  end

  def call
    begin
      ActiveRecord::Base.transaction do
        staff = Staff.create!(staff_params)
        [true, staff]
      end
    rescue StandardError => e
      [false, e]
    end
  end

  private

  attr_accessor :staff_params
end
