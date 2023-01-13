class Leaves::RespondToLeaveApplicationService < ApplicationService
  def initialize(current_user, leave_application, status_params)
    @current_user = current_user
    @leave_application = leave_application
    @status_params = status_params
  end

  def call
    return [false, "Leave application has been approved"] if leave_application.status == :approved
    
    begin         
      ActiveRecord::Base.transaction do
        if status_params === LeaveApplication.statuses[:cancelled]
          leave_application.update!(status: status_params, approver_id: current_user.id)
          return [true, leave_application]
        end

        leave_type = leave_application.leave_type
        leave = Leave.find_by(staff_id: leave_application.staff_id)
        number_of_days_off = leave_application.number_of_days_off
        
        case leave_type
        when "marriage_leave"
          update, message = update_leave(leave, leave_type, 3, number_of_days_off)
          return [false, message] unless update
        when "compassionate_leave"
          update, message = update_leave(leave, leave_type, 3, number_of_days_off)
          return [false, message] unless update
        when "paternity_leave"
          update, message = update_leave(leave, leave_type, 1, number_of_days_off)
          return [false, message] unless update
        when "maternity_leave"
          update, message = update_leave(leave, leave_type, 6*30, number_of_days_off)
          return [false, message] unless update
        when "casual_leave"
          update, message = update_leave(leave, leave_type, leave.allowed_number_of_days_off, number_of_days_off)
          return [false, message] unless update
        when "unpaid_leave"
          leave.update!(unpaid_leave: number_of_days_off + leave.unpaid_leave)
        else
          return [false, "Leave application be invalid"]
        end
        
        [true, leave_application] if leave_application.update!(status: status_params, approver_id: current_user.id)
      end
    rescue StandardError => e
      [false, e]
    end
  end

  private

  attr_accessor :current_user, :leave_application, :status_params

  def update_leave(leave, leave_type, allow_days, number_of_days_off)
    return [false, I18n.t('error_codes.E209')] if (number_of_days_off + leave.send(leave_type)) > allow_days
    leave.update!("#{leave_type}": number_of_days_off + leave.send(leave_type))
  end
end
