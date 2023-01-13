class Leaves::CreateLeaveApplicationService < ApplicationService
  def initialize(current_user, leave_application_params)
    @current_user = current_user
    @leave_application_params = leave_application_params
  end

  def call
    begin
      ActiveRecord::Base.transaction do
        leave_type = leave_application_params[:leave_type]
        leave = Leave.find_by(staff_id: current_user.id)
        number_of_days_off = leave_application_params[:number_of_days_off]
        
        case leave_type
        when LeaveApplication.leave_types[:marriage_leave]
          create, message = check_leave_application(leave, "marriage_leave", 3, number_of_days_off)
          return [false, message] unless create
        when LeaveApplication.leave_types[:compassionate_leave]
          create, message = check_leave_application(leave, "compassionate_leave", 3, number_of_days_off)
          return [false, message] unless create
        when LeaveApplication.leave_types[:paternity_leave]
          create, message = check_leave_application(leave, "paternity_leave", 1, number_of_days_off)
          return [false, message] unless create
        when LeaveApplication.leave_types[:maternity_leave]
          create, message = check_leave_application(leave, "maternity_leave", 6*30, number_of_days_off)
          return [false, message] unless create
        when LeaveApplication.leave_types[:casual_leave]
          create, message = check_leave_application(leave, "casual_leave", leave.allowed_number_of_days_off, number_of_days_off)
          return [false, message] unless create
        when LeaveApplication.leave_types[:unpaid_leave]
        else
          return [false, "Leave application be invalid"]
        end

        leave_application = LeaveApplication.new(leave_application_params)
        leave_application.staff_id = current_user.id
        leave_application.status = :pending
        [true, leave_application] if leave_application.save!
      end
    rescue StandardError => e
      [false, e]
    end
  end

  private

  attr_accessor :current_user, :leave_application_params

  def check_leave_application(leave, leave_type, allow_days, number_of_days_off)
    (number_of_days_off.to_f + leave.send(leave_type)) > allow_days ? [false, I18n.t('error_codes.E209')] : true
  end
end
