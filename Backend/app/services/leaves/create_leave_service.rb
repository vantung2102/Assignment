class Leaves::CreateLeaveService < ApplicationService
  def initialize(staff)
    @staff = staff
  end

  def call
    begin
      ActiveRecord::Base.transaction do
        leave = Leave.create!(
          staff_id: staff.id,
          casual_leave: 0,
          unpaid_leave: 0,
          marriage_leave: 0,
          compassionate_leave: 0,
          paternity_leave: 0,
          maternity_leave: 0,
          allowed_number_of_days_off: 12,
        )
        [true, leave]
      end
    rescue StandardError => e
      [false, e]
    end
  end

  private

  attr_accessor :staff
end
