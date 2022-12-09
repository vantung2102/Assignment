class Staffs::UpdateStaffActivationStatusService < ApplicationService
  def initialize(staff, status)
    @staff = staff
    @status = status
  end

  def call
    begin
      ActiveRecord::Base.transaction do
        staff.update!(status: status) 
        create, onboarding = Onboarding::CreateOnboardingService.call(staff) if staff.status == 'inactive' && status == Staff.statuses[:active]
        return [false, onboarding] if create == false
        [true, staff]
      end
    rescue StandardError => e
      [false, e]
    end
  end

  private

  attr_accessor :staff, :status
end
